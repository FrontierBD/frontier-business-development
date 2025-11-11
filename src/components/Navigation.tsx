import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      setIsScrolled(window.scrollY > 20);
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
  return <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isHomePage ? "text-white hover:text-white/80 transition-colors" : "text-primary hover:text-primary-light transition-colors"}>
              Home
            </Link>
            <Link to="/services" className={isHomePage ? "text-white hover:text-white/80 transition-colors" : "text-primary hover:text-primary-light transition-colors"}>
              Services
            </Link>
            <Link to="/projects" className={isHomePage ? "text-white hover:text-white/80 transition-colors" : "text-primary hover:text-primary-light transition-colors"}>​Portfolio</Link>
            <Link to="/contact" className={isHomePage ? "text-white hover:text-white/80 transition-colors" : "text-primary hover:text-primary-light transition-colors"}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className={isHomePage ? "md:hidden text-white absolute right-4" : "md:hidden text-primary absolute right-4"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isHomePage ? "block w-full text-center text-white hover:text-white/80 transition-colors py-2" : "block w-full text-center text-primary hover:text-primary-light transition-colors py-2"}>
              Home
            </Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={isHomePage ? "block w-full text-center text-white hover:text-white/80 transition-colors py-2" : "block w-full text-center text-primary hover:text-primary-light transition-colors py-2"}>
              Services
            </Link>
            <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className={isHomePage ? "block w-full text-center text-white hover:text-white/80 transition-colors py-2" : "block w-full text-center text-primary hover:text-primary-light transition-colors py-2"}>
              Projects
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={isHomePage ? "block w-full text-center text-white hover:text-white/80 transition-colors py-2" : "block w-full text-center text-primary hover:text-primary-light transition-colors py-2"}>
              Contact
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navigation;