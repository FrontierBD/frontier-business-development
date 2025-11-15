import { useState, useRef, useEffect } from "react";
import logoWhite from "@/assets/logo-white.png";

const Hero = () => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlay(true);
          videoRef.current?.play();
        } else {
          setShouldPlay(false);
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 }
    );
    
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);
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
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* 🎥 Background Video */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black animate-pulse" />
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-video-poster.jpg"
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover scale-110 -translate-x-[5%]"
      >
        <source src="/videos/hero-video.webm" type="video/webm" />
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* 🌙 Dark overlay with top-to-bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

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
          Building high performing websites and AI-powered systems that help your business attract more clients and
          scale faster.
        </p>
      </div>
    </section>
  );
};

export default Hero;
