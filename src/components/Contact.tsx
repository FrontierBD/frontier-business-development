import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    service: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        "https://oftwtytbgjyvuuzmlhbl.supabase.co/functions/v1/send-contact-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours."
        });
        setFormData({
          name: "",
          email: "",
          businessName: "",
          service: "",
          message: ""
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };
  return <section id="contact" className="py-20 md:py-32" style={{ background: '#2a2a2a' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Get In <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to elevate your digital presence? Let's start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in-up">
            <Card className="border-border bg-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">team@frontierbd.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (782) 882-2671</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Location</h3>
                  <p className="text-sm text-muted-foreground">Halifax, Nova Scotia</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2 border-border bg-card shadow-card animate-fade-in-up">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-card-foreground">
                      Name *
                    </label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} required placeholder="John Doe" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                      Email *
                    </label>
                    <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} required placeholder="john@example.com" className="bg-background border-border" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-medium text-card-foreground">
                      Business Name *
                    </label>
                    <Input id="businessName" value={formData.businessName} onChange={e => setFormData({
                    ...formData,
                    businessName: e.target.value
                  })} required placeholder="Your Business" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-card-foreground">
                      Service Needed *
                    </label>
                    <Input id="service" value={formData.service} onChange={e => setFormData({
                    ...formData,
                    service: e.target.value
                  })} required placeholder="Website Design, SEO, etc." className="bg-background border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-card-foreground">
                    Message
                  </label>
                  <Textarea id="message" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} placeholder="Tell us about your project..." rows={5} className="bg-background border-border" />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-light shadow-glow transition-all duration-300 hover:scale-105" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;