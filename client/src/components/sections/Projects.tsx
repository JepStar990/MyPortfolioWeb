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
    title: "Real-Time 3D Printer Monitoring System",
    description: "Real-time monitoring for 3D printers with automated quality control: MQTT telemetry streaming, ML anomaly detection and Grafana dashboards, fully containerized with Docker.",
    imageUrl: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&q=80",
    categories: ["data-engineering", "machine-learning"],
    technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "Docker", "MLflow"],
    githubUrl: "https://github.com/JepStar990/3d-printing-mlops",
    liveUrl: "",
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: "Weather MLOps Forecasts",
    description: "Production-grade MLOps pipeline ingesting forecasts from five weather providers, measuring per-source error, and training a LightGBM ensemble champion - orchestrated hourly on free tiers.",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
    categories: ["machine-learning", "data-engineering"],
    technologies: ["Python", "LightGBM", "PostgreSQL", "GitHub Actions", "FastAPI", "Gradio"],
    githubUrl: "https://github.com/JepStar990/weather-mlops-forecasts-v2",
    liveUrl: "https://jepstar990.github.io/weather-mlops-forecasts/",
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: "NYC TLC Fabric",
    description: "Medallion lakehouse analytics for NYC taxi trip data on Microsoft Fabric: bronze/silver/gold pipeline, a data contract, a Direct Lake semantic model and Power BI reporting.",
    imageUrl: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=600&q=80",
    categories: ["cloud", "data-engineering"],
    technologies: ["Microsoft Fabric", "PySpark", "T-SQL", "Power BI", "Data Factory"],
    githubUrl: "https://github.com/JepStar990/nyc-tlc-fabric",
    liveUrl: "",
    featured: true,
    order: 3,
  },
  {
    id: 4,
    title: "SiteQA",
    description: "Browser-only RAG extension that crawls and indexes entire websites locally with ONNX embeddings and an IndexedDB vector store, answering questions with cited, sanitized responses - no backend, BYOK.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    categories: ["machine-learning"],
    technologies: ["TypeScript", "RAG", "ONNX", "transformers.js", "IndexedDB", "DeepSeek"],
    githubUrl: "https://github.com/JepStar990/rag-site-qa",
    liveUrl: "",
    featured: true,
    order: 4,
  },
  {
    id: 5,
    title: "Real-Time Stock Monitoring System",
    description: "Distributed streaming application in Java: WebSocket market data into Kafka, Spark Structured Streaming moving averages and breakout detection, TimescaleDB storage and Grafana dashboards.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    categories: ["data-engineering"],
    technologies: ["Java", "Scala", "Kafka", "Spark", "TimescaleDB", "Grafana"],
    githubUrl: "https://github.com/JepStar990/stock-monitor-system",
    liveUrl: "",
    featured: true,
    order: 5,
  },
  {
    id: 6,
    title: "Customer Lifecycle Dashboard",
    description: "End-to-end BI project on AdventureWorks 2019: SQL extraction and transformation, dimensional modeling, and Power BI and Tableau dashboards tracing the customer journey.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    categories: ["visualization"],
    technologies: ["SQL", "Power BI", "Tableau", "Data Modeling"],
    githubUrl: "https://github.com/JepStar990/customer-lifecycle-dashboard",
    liveUrl: "",
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
