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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

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
              className="group hover:shadow-premium transition-all duration-500 hover:-translate-y-3 border-primary/20 animate-fade-in-up hover:border-primary/40 overflow-hidden relative backdrop-blur-sm bg-white/90 hover:scale-[1.02]"
              style={{ 
                animationDelay: `${index * 150}ms`,
                boxShadow: '0 4px 20px rgba(0, 74, 173, 0.08)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardContent className="p-6 md:p-8 space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                  <service.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110 animate-icon-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 relative inline-block">
                  {service.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-500" />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 pt-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 group/item">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 transition-transform group-hover/item:scale-110" />
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
