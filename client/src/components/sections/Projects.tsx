import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import ProjectCard from "@/components/ui/ProjectCard";

type ProjectFilter = "all" | "data-engineering" | "visualization" | "machine-learning" | "cloud";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = 
    activeFilter === "all" 
      ? projects 
      : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" ref={ref} className="py-20">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn("up", 0.3)} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">Portfolio</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-dark-600 dark:text-dark-300">A collection of my data engineering and reporting projects that solve real-world problems.</p>
        </motion.div>
        
        <motion.div variants={fadeIn("up", 0.4)} className="mb-8 flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => setActiveFilter("all")}
            variant={activeFilter === "all" ? "default" : "outline"}
            data-filter="all"
          >
            All
          </Button>
          <Button 
            onClick={() => setActiveFilter("data-engineering")}
            variant={activeFilter === "data-engineering" ? "default" : "outline"}
            data-filter="data-engineering"
          >
            Data Engineering
          </Button>
          <Button 
            onClick={() => setActiveFilter("visualization")}
            variant={activeFilter === "visualization" ? "default" : "outline"}
            data-filter="visualization"
          >
            Reporting
          </Button>
          <Button 
            onClick={() => setActiveFilter("machine-learning")}
            variant={activeFilter === "machine-learning" ? "default" : "outline"}
            data-filter="machine-learning"
          >
            AI & Machine Learning
          </Button>
          <Button 
            onClick={() => setActiveFilter("cloud")}
            variant={activeFilter === "cloud" ? "default" : "outline"}
            data-filter="cloud"
          >
            Cloud
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", 0.1 * (index + 1))}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={fadeIn("up", 0.6)} className="text-center mt-12">
          <Button variant="outline" className="inline-flex items-center">
            <span>View All Projects</span>
            <i className="ri-arrow-right-line ml-2"></i>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
