import { useLocation } from "wouter";

export default function Footer() {
  const [, navigate] = useLocation();
  
  const handleNavClick = (href: string) => {
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
  
  return (
    <footer className="bg-dark-800 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a
              href="#"
              className="text-xl font-bold flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <span className="text-2xl"><i className="ri-user-line"></i></span>
              <span>Zwiswa Muridili</span>
            </a>
            <p className="text-dark-300 mt-2 max-w-md">
              Data Engineer & Reporting Specialist turning complex data into meaningful insights.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://linkedin.com/in/zwiswa-muridili-15439a302/" target="_blank" rel="noopener noreferrer" className="text-dark-300 transition-colors duration-200">
              <i className="ri-linkedin-fill text-xl"></i>
            </a>
            <a href="https://github.com/JepStar990" target="_blank" rel="noopener noreferrer" className="text-dark-300 transition-colors duration-200">
              <i className="ri-github-fill text-xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark-300 transition-colors duration-200">
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-dark-300 transition-colors duration-200">
              <i className="ri-medium-fill text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-dark-300 hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#about");
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-dark-300 hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#skills");
                    }}
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-dark-300 hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#projects");
                    }}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-dark-300 hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-dark-300 hover:text-white transition-colors duration-200"
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
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark-300 hover:text-white transition-colors duration-200">Blog</a>
                </li>
              </ul>
            </div>
            
            <p className="text-dark-400 text-sm">&copy; {new Date().getFullYear()} Zwiswa Muridili. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
