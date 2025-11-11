import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoBlue from "@/assets/logo-blue.png";
import logoWhite from "@/assets/logo-white.png";
const Hero = () => {
  return <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-0 animate-fade-in-up pt-20 md:pt-0">
          <div className="flex justify-center mx-auto">
            <img src={logoWhite} alt="Frontier Business Development" className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto drop-shadow-2xl" />
          </div>
          
          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto drop-shadow-lg text-center md:text-2xl mt-48">We build high performing websites and AI-powered systems that help businesses attract more clients and scale faster.</p>

          

          
        </div>
      </div>
    </section>;
};
export default Hero;