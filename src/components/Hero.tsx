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

      {/* Fixed content width (no Tailwind container) */}
      <div className="relative z-10 mx-auto max-w-[1150px] px-6">
        <div className="mx-auto text-center animate-fade-in-up pt-12">
          <div className="flex justify-center">
            {/* Use clamp for consistent logo size across devices */}
            <img
              src={logoWhite}
              alt="Frontier Business Development"
              className="w-[clamp(260px,34vw,520px)] h-auto drop-shadow-2xl"
            />
          </div>

          {/* Use clamp for consistent text size; remove breakpoint-based scaling */}
          <p className="text-[clamp(18px,2.1vw,28px)] leading-snug text-white/95 max-w-[1000px] mx-auto drop-shadow-lg mt-6">
            We build high performing websites and AI-powered systems that help businesses attract more clients and scale
            faster.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
