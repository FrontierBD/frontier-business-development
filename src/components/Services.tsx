import { Globe, Search, Bot, Share2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Modern, responsive websites built to showcase your business and convert visitors into customers.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Improve your search rankings and get found by customers actively looking for your services.",
  },
  {
    icon: Bot,
    title: "AI Website Integrations",
    description: "Intelligent chatbots and automation tools that enhance customer engagement 24/7.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Professional social media strategies that build your brand and grow your audience.",
  },
  {
    icon: TrendingUp,
    title: "Digital Ad Campaigns",
    description: "Targeted advertising campaigns that deliver measurable results and maximize your ROI.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored for small businesses in Atlantic Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
