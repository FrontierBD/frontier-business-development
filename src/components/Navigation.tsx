import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Trigger color change after scrolling down a bit
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const showWhiteNav = isScrolled && isHomePage;
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showWhiteNav ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 md:h-20">
          <div className="flex items-center space-x-4 md:space-x-8">
            <button onClick={() => scrollToSection('hero')} className={showWhiteNav || !isHomePage ? "text-foreground hover:text-primary transition-colors text-sm md:text-base" : "text-white hover:text-white/80 transition-colors text-sm md:text-base"}>
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className={showWhiteNav || !isHomePage ? "text-foreground hover:text-primary transition-colors text-sm md:text-base" : "text-white hover:text-white/80 transition-colors text-sm md:text-base"}>
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className={showWhiteNav || !isHomePage ? "text-foreground hover:text-primary transition-colors text-sm md:text-base" : "text-white hover:text-white/80 transition-colors text-sm md:text-base"}>
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;