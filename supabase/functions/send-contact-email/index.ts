import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  businessName: string;
  service: string;
  message: string;
  website?: string; // Honeypot field
}

// Simple in-memory rate limiting (resets on function cold start)
const submissionTracker = new Map<string, number>();

const isRateLimited = (email: string): boolean => {
  const now = Date.now();
  const lastSubmission = submissionTracker.get(email);
  
  if (lastSubmission && now - lastSubmission < 60000) { // 1 minute
    return true;
  }
  
  submissionTracker.set(email, now);
  return false;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", { name: formData.name, email: formData.email });

    // Honeypot check
    if (formData.website) {
      console.log("Honeypot triggered - likely spam");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Rate limiting check
    if (isRateLimited(formData.email)) {
      console.log("Rate limit exceeded for:", formData.email);
      return new Response(
        JSON.stringify({ success: false, error: "Please wait before submitting again." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to team@frontierbd.com
    const emailResponse = await resend.emails.send({
      from: "Frontier Business Development <noreply@frontierbd.com>",
      to: ["team@frontierbd.com"],
      replyTo: formData.email,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Business Name:</strong> ${formData.businessName}</p>
        <p><strong>Service Needed:</strong> ${formData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
