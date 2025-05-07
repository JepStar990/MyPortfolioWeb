import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Project } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-4">Project Not Found</h1>
            <p className="text-center mb-6">Sorry, the project you're looking for doesn't exist or couldn't be loaded.</p>
            <div className="flex justify-center">
              <Button onClick={() => navigate("/")} variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer}
      className="py-20 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeIn("down", 0.2)} className="mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all projects
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={fadeIn("right", 0.3)} className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden border border-dark-200 dark:border-dark-700">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <p className="text-dark-600 dark:text-dark-300 mb-6">{project.description}</p>

                <h2 className="text-xl font-bold mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-sm bg-dark-100 dark:bg-dark-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button as="a" href={project.githubUrl} target="_blank" variant="outline" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button as="a" href={project.liveUrl} target="_blank" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("left", 0.4)} className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden border border-dark-200 dark:border-dark-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Project Categories</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`text-sm px-3 py-1 rounded-full ${
                      category === 'data-engineering'
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : category === 'data analysis and visualization'
                        ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400'
                        : category === 'ai & machine-learning'
                        ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                        : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300'
                    }`}
                  >
                    {category
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                ))}
              </div>

              <Separator className="my-6" />

              <h2 className="text-xl font-bold mb-4">Other Projects</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/")}>
                  View all projects
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
