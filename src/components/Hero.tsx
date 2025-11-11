import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoBlue from "@/assets/logo-blue.png";
import logoWhite from "@/assets/logo-white.png";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CHANGED: replace container with fixed max width */}
      <div className="relative z-10 mx-auto max-w-[1150px] px-6">
        <div className="max-w-4xl mx-auto text-center space-y-0 animate-fade-in-up pt-12 md:pt-0">
          {/* CHANGED: removed negative margins */}
          <div className="flex justify-center mx-auto">
            <img
              src={logoWhite}
              alt="Frontier Business Development"
              className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto drop-shadow-2xl"
            />
          </div>

          {/* CHANGED: removed mt-96 / my-[40px], added sane gap */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg mt-6">
            We build high performing websites and AI-powered systems that help businesses attract more clients and scale
            faster.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
