import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    
    // Handle navigation
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate there first
      if (window.location.pathname !== '/') {
        navigate('/');
        // Need to wait for navigation to complete before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // We're already on the home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-dark-200 dark:border-dark-700' 
          : 'bg-transparent'
      }`}
    >
      <motion.div 
        className="container mx-auto px-4 py-3 flex justify-between items-center"
        initial="initial"
        animate="animate"
        variants={headerVariants}
      >
        <a 
          href="#" 
          className="text-xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <span className="text-2xl"><i className="ri-user-line"></i></span>
          <span>Zwiswa Muridili</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              as="a" 
              href="/resume.pdf" 
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "https://drive.usercontent.google.com/download?id=15SdTp99ILUiCV7jPY1gPH5lbDSHj12kJ&export=download&authuser=2&confirm=t&uuid=21ff4050-3386-4fbe-a447-1c113a6c22b3&at=APcmpoxrZRyOZm_dJfd5qIageDTa:1745359510858";
                link.download = "Zwiswa-Muridili-Resume.docx";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                alert("Download in progress..");
              }}
            >
              Resume
            </Button>
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-xl p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="block py-2 px-3 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-md transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="border-t border-dark-200 dark:border-dark-700 pt-2 flex justify-between">
                  <Button 
                    as="a" 
                    href="#" 
                    variant="default"
                    className="block py-2 px-3"
                    onClick={(e) => {
                      e.preventDefault();
                      const link = document.createElement("a");
                      link.href = "https://drive.usercontent.google.com/download?id=15SdTp99ILUiCV7jPY1gPH5lbDSHj12kJ&export=download&authuser=2&confirm=t&uuid=21ff4050-3386-4fbe-a447-1c113a6c22b3&at=APcmpoxrZRyOZm_dJfd5qIageDTa:1745359510858";
                      link.download = "Zwiswa-Muridili-Resume.docx";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      alert("Download in progress..");
                    }}
                  >
                    Resume
                  </Button>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
