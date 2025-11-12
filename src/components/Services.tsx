import { Globe, Bot, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Website Design & SEO Optimization",
    description: "We build fast, modern websites that capture attention and drive conversions. Each site is optimized for SEO and built to grow with your business.",
    features: [
      "Responsive design",
      "SEO keyword targeting",
      "Google Analytics integration"
    ]
  },
  {
    icon: Bot,
    title: "AI Integration & Automation",
    description: "We help you save time and scale faster by automating key business processes with AI-driven tools.",
    features: [
      "Chatbots for customer service",
      "Lead capture & CRM automation",
      "Workflow integration"
    ]
  },
];

const Services = ({ className = "" }: { className?: string }) => {
  return (
    <section id="services" className={`py-20 md:py-32 relative overflow-hidden ${className}`} style={{ background: 'var(--gradient-services)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored for small businesses in Atlantic Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border-primary/20 animate-fade-in-up hover:border-primary/40 overflow-hidden relative"
              style={{ 
                animationDelay: `${index * 150}ms`,
                background: 'hsl(213 100% 34%)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 md:p-8 space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 relative inline-block">
                  {service.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 pt-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
