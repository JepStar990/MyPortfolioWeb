import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function Hero() {
  const [, navigate] = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row items-center"
      >
        <div className="lg:w-1/2 z-10">
          <motion.div variants={fadeIn("up", 0.2)}>
            <span className="inline-block text-primary-600 dark:text-primary-400 font-medium mb-2">Hi, I'm</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Zwiswa Muridili</h1>
            <h2 className="text-2xl md:text-3xl text-dark-600 dark:text-dark-300 mb-6">Data Engineer & Reporting Specialist</h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-lg mb-8">
              I build robust data pipelines and create insightful visualizations that transform complex data into meaningful stories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => handleNavClick("#projects")}
                className="flex items-center"
                size="lg"
              >
                <span>View My Work</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleNavClick("#contact")}
                variant="outline"
                size="lg"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn("up", 0.5)}
            className="mt-12 flex items-center gap-6"
          >
            <a href="https://www.linkedin.com/in/zwiswa-muridili-15439a302/" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400 transition-colors duration-200 text-xl">
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a href="https://github.com/JepStar990" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400 transition-colors duration-200 text-xl">
              <i className="ri-github-fill"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400 transition-colors duration-200 text-xl">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400 transition-colors duration-200 text-xl">
              <i className="ri-medium-fill"></i>
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          variants={fadeIn("left", 0.3)}
          className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end z-10"
        >
          <div className="relative max-w-md">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-500/20 rounded-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/20 rounded-full animate-pulse-slow"></div>
            <div className="dark:bg-dark-800 p-6 rounded-lg shadow-xl border border-dark-200 dark:border-dark-700 relative">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-xs font-mono text-dark-500 dark:text-dark-400">data_pipeline.py</div>
              </div>
              
              <pre className="font-mono bg-dark-50 dark:bg-dark-900 p-4 rounded text-sm overflow-x-auto"><code><span className="text-secondary-600 dark:text-secondary-400">def</span> <span className="text-primary-600 dark:text-primary-400">process_data</span>(source_data):
    <span className="text-dark-500 dark:text-dark-400"># Extract relevant features</span>
    features = extract_features(source_data)
    
    <span className="text-dark-500 dark:text-dark-400"># Transform data</span>
    transformed = apply_transformations(features)
    
    <span className="text-dark-500 dark:text-dark-400"># Load to data warehouse</span>
    success = load_to_warehouse(transformed)
    
    <span className="text-secondary-600 dark:text-secondary-400">return</span> {"{"}
        <span className="text-accent-600 dark:text-accent-400">"status"</span>: <span className="text-green-600 dark:text-green-400">"success"</span>,
        <span className="text-accent-600 dark:text-accent-400">"records"</span>: len(transformed)
    {"}"}</code></pre>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 text-center mb-8 animate-bounce">
        <button 
          onClick={() => handleNavClick("#about")}
          className="inline-block text-dark-500 dark:text-dark-400"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
      
      {/* Background shapes */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
