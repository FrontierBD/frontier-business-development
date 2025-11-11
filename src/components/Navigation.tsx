import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";
import logoWhite from "@/assets/logo-white.png";
const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false);
    }
  };
  const showWhiteNav = isScrolled && isHomePage;
  
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showWhiteNav ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className={showWhiteNav || !isHomePage ? "text-primary hover:text-primary-light transition-colors" : "text-white hover:text-white/80 transition-colors"}>
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className={showWhiteNav || !isHomePage ? "text-primary hover:text-primary-light transition-colors" : "text-white hover:text-white/80 transition-colors"}>
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className={showWhiteNav || !isHomePage ? "text-primary hover:text-primary-light transition-colors" : "text-white hover:text-white/80 transition-colors"}>
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className={showWhiteNav || !isHomePage ? "md:hidden text-primary absolute right-4" : "md:hidden text-white absolute right-4"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button onClick={() => scrollToSection('hero')} className={showWhiteNav || !isHomePage ? "block w-full text-center text-primary hover:text-primary-light transition-colors py-2" : "block w-full text-center text-white hover:text-white/80 transition-colors py-2"}>
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className={showWhiteNav || !isHomePage ? "block w-full text-center text-primary hover:text-primary-light transition-colors py-2" : "block w-full text-center text-white hover:text-white/80 transition-colors py-2"}>
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className={showWhiteNav || !isHomePage ? "block w-full text-center text-primary hover:text-primary-light transition-colors py-2" : "block w-full text-center text-white hover:text-white/80 transition-colors py-2"}>
              Contact
            </button>
          </div>
        </div>}
    </nav>;
};
export default Navigation;