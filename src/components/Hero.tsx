import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/euQHzaBTC-M?si=7ytBwkWAKRsGwRKF&start=2713&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=euQHzaBTC-M"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up pt-20 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg">
            We Elevate Your Businesses{" "}
            <span className="text-primary-light drop-shadow-lg">
              Digital Presence
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            Enhancing digital presence for Atlantic Canadian businesses through modern websites, 
            SEO optimization, and AI-powered solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-light shadow-glow text-base md:text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                Get a Free Quote
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8 py-6 transition-all duration-300"
              >
                Explore Services
              </Button>
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center space-y-1 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-light">100+</div>
              <div className="text-sm text-white/80">Projects Delivered</div>
            </div>
            <div className="text-center space-y-1 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-light">98%</div>
              <div className="text-sm text-white/80">Client Satisfaction</div>
            </div>
            <div className="text-center space-y-1 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-light">5+</div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
