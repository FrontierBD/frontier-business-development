import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoBlue from "@/assets/logo-blue.png";
import logoWhite from "@/assets/logo-white.png";

const Hero = () => {
  // ================================================================
  // 🛠️ EASY CUSTOMIZATION SECTION
  // ---------------------------------------------------------------
  // Use clamp(MIN, IDEAL, MAX)
  // ↑ smallest allowed   ↑ typical / fluid   ↑ biggest allowed
  // You can use ANY px, vw, or % values — they aren’t preset numbers.
  // ================================================================

  // 🖼️ LOGO SETTINGS
  const logoWidth = "clamp(380px, 50vw, 820px)"; // Bigger numbers → bigger logo
  const logoMarginTop = "0px"; // Positive = move logo DOWN | Negative = move UP

  // ✍️ TEXT SETTINGS
  const textFontSize = "clamp(14px, 1.1vw, 20px)"; // Bigger numbers → larger text
  const textMarginTop = "40px"; // Bigger → move text LOWER | Smaller → closer to logo
  const textMaxWidth = "1500px"; // Controls how wide the text can stretch
  // ================================================================

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110 -translate-x-[5%]"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* 🌙 Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🧱 Main content */}
      <div className="relative z-10 mx-auto max-w-[1150px] px-6 text-center animate-fade-in-up">
        {/* LOGO */}
        <div className="flex justify-center">
          <img
            src={logoWhite}
            alt="Frontier Business Development"
            style={{
              width: logoWidth,
              marginTop: logoMarginTop,
            }}
            className="h-auto drop-shadow-2xl"
          />
        </div>

        {/* TEXT BELOW LOGO */}
        <p
          style={{
            fontSize: textFontSize,
            marginTop: textMarginTop,
            maxWidth: textMaxWidth,
          }}
          className="leading-snug text-white/95 mx-auto drop-shadow-lg"
        >
          We build high performing websites and AI-powered systems that help businesses attract more clients and scale
          faster.
        </p>
      </div>
    </section>
  );
};

export default Hero;
