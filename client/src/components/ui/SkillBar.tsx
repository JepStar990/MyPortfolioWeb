import { motion } from "framer-motion";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: "primary" | "secondary" | "accent";
}

export default function SkillBar({ name, percentage, color = "primary" }: SkillBarProps) {
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });
  
  const colorClass = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    accent: "bg-accent-500"
  }[color];
  
  return (
    <div ref={ref} className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
