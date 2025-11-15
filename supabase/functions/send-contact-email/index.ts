import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  businessName: z.string().trim().min(1, "Business name is required").max(200, "Business name too long"),
  service: z.string().trim().min(1, "Service selection is required").max(100, "Service name too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message too long"),
  website: z.string().optional() // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

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

// HTML escaping function to prevent HTML injection
const escapeHtml = (text: string): string => {
  return text.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char] || char));
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawData = await req.json();
    const validationResult = contactSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid form data",
          details: validationResult.error.errors.map(e => e.message)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const formData = validationResult.data;
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

    // Sanitize name for subject line to prevent email header injection
    const sanitizedName = formData.name.replace(/[\r\n]/g, '');
    
    // Send email to team@frontierbd.com
    const emailResponse = await resend.emails.send({
      from: "Frontier Business Development <noreply@frontierbd.com>",
      to: ["team@frontierbd.com"],
      replyTo: formData.email,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
        <p><strong>Business Name:</strong> ${escapeHtml(formData.businessName)}</p>
        <p><strong>Service Needed:</strong> ${escapeHtml(formData.service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
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
