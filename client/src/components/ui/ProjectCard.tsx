import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Project } from "@shared/types";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [, navigate] = useLocation();
  
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "data-engineering":
        return "bg-primary-500/80 px-2 py-1 rounded-full";
      case "reporting":
        return "bg-secondary-500/80 px-2 py-1 rounded-full";
      case "machine-learning":
        return "bg-accent-500/80 px-2 py-1 rounded-full";
      case "cloud":
        return "bg-accent-500/80 px-2 py-1 rounded-full";
      default:
        return "bg-dark-500/80 px-2 py-1 rounded-full";
    }
  };

  return (
    <div className="project-card group h-full">
      <div className="dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden h-full border border-dark-200 dark:border-dark-700 flex flex-col transition-transform duration-300 hover:translate-y-[-5px]">
        <div className="relative overflow-hidden h-48">
          <img 
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="project-overlay absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <div className="flex gap-2 mb-2">
                {project.categories.map((category, index) => (
                  <span key={index} className={`text-xs ${getCategoryBadgeClass(category)}`}>
                    {category
                      .split("-")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{project.title}</h3>
          <p className="text-dark-600 dark:text-dark-300 mb-4 flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="text-xs bg-dark-100 dark:bg-dark-700 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate(`/projects/${project.id}`)}
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center"
            >
              <span>View Project</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
            
            <div className="flex gap-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-500 hover:text-dark-800 dark:text-dark-400 dark:hover:text-dark-100"
                  aria-label="View source code on GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dark-500 hover:text-dark-800 dark:text-dark-400 dark:hover:text-dark-100"
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
