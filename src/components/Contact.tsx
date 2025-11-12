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
  return <section id="contact" className="py-12 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(213 25% 8%), hsl(213 25% 5%), hsl(0 0% 0%))' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">team@frontierbd.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group" style={{ animationDelay: '150ms' }}>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (782) 882-2671</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                  <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">Location</h3>
                  <p className="text-sm text-muted-foreground">Halifax, Nova Scotia</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2 border-primary/20 bg-card/80 backdrop-blur-sm shadow-premium animate-fade-in-up overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 md:p-8 relative z-10">
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
                  })} required placeholder="Website Design, SEO (Search Engine Optimization), etc." className="bg-background border-border" />
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

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/button" 
                  size="lg"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;