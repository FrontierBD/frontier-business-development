import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up pt-20 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-[0.07em] text-white drop-shadow-2xl">
            Frontier Business{" "}
            <span className="text-primary-light drop-shadow-2xl">
              Development
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto drop-shadow-lg text-center md:text-2xl">​We build high performing websites and AI-powered systems that help businesses attract more clients and scale faster.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary-light shadow-glow text-base md:text-lg px-8 py-6 transition-all duration-300 hover:scale-105">
                Get a Free Quote
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8 py-6 transition-all duration-300">
                Explore Services
              </Button>
            </Link>
          </div>

          
        </div>
      </div>
    </section>;
};
export default Hero;