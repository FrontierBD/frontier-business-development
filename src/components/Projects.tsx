import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing success stories from businesses across Atlantic Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="group relative overflow-hidden border-border bg-card hover:shadow-glow transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${item * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-card-foreground">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">
                        Exciting projects on the way
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
