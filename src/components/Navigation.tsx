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
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showWhiteNav ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-14 md:h-16">
          <div className="flex items-center space-x-6 md:space-x-8">
            <button onClick={() => scrollToSection('hero')} className={`transition-colors text-sm md:text-base ${showWhiteNav || !isHomePage ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"}`}>
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className={`transition-colors text-sm md:text-base ${showWhiteNav || !isHomePage ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"}`}>
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className={`transition-colors text-sm md:text-base ${showWhiteNav || !isHomePage ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"}`}>
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;