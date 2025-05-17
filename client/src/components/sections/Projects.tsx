import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import ProjectCard from "@/components/ui/ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
};

const projectsData: Project[] = [
  {
    id: 1,
    title: "Real-time Data Dashboard",
    description: "Built an end-to-end solution for monitoring IoT sensor data with real-time analytics and alerts.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    categories: ["data-engineering", "visualization"],
    technologies: ["Apache Kafka", "Spark Streaming", "Tableau", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: "Cloud Data Warehouse",
    description: "Designed and implemented a scalable data warehouse solution on AWS to consolidate data from multiple sources.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    categories: ["data-engineering", "cloud"],
    technologies: ["AWS Redshift", "S3", "Airflow", "Python"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: "Predictive Analytics Dashboard",
    description: "Created an interactive dashboard with machine learning models to predict customer behavior and business trends.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    categories: ["visualization", "machine-learning"],
    technologies: ["Scikit-learn", "D3.js", "React", "Flask"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 3,
  },
  {
    id: 4,
    title: "ETL Pipeline Automation",
    description: "Developed a robust ETL system that automates data extraction, transformation, and loading processes.",
    imageUrl: "https://miro.medium.com/v2/resize:fit:1400/0*1YAwjo9ByzbuJS-9",
    categories: ["data-engineering"],
    technologies: ["Airflow", "Python", "Docker", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 4,
  },
  {
    id: 5,
    title: "Interactive Financial Dashboard",
    description: "Designed a comprehensive financial dashboard with interactive charts and drill-down capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    categories: ["visualization"],
    technologies: ["Tableau", "SQL", "Power BI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 5,
  },
  {
    id: 6,
    title: "ML Model Deployment",
    description: "Built and deployed machine learning models in a cloud environment with automated retraining capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    categories: ["machine-learning", "cloud"],
    technologies: ["TensorFlow", "GCP", "Kubernetes", "MLflow"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    order: 6,
  }
];

type ProjectFilter = "all" | "data-engineering" | "visualization" | "machine-learning" | "cloud";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter(project => project.categories.includes(activeFilter));

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
          {["all", "data-engineering", "visualization", "machine-learning", "cloud"].map(filter => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter as ProjectFilter)}
              variant={activeFilter === filter ? "default" : "outline"}
              data-filter={filter}
            >
              {filter === "all" ? "All" : filter.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}
            </Button>
          ))}
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
