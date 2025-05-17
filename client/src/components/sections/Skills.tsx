import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

type Skill = {
  id: number;
  name: string;
  percentage: number;
  category: string;
};

const skillsData: Skill[] = [
  { id: 1, name: "Python", percentage: 95, category: "data-engineering" },
  { id: 2, name: "SQL", percentage: 90, category: "data-engineering" },
  { id: 3, name: "Apache Spark", percentage: 85, category: "data-engineering" },
  { id: 4, name: "Airflow", percentage: 80, category: "data-engineering" },
  { id: 5, name: "Kafka", percentage: 75, category: "data-engineering" },
  { id: 6, name: "Tableau", percentage: 90, category: "visualization" },
  { id: 7, name: "Power BI", percentage: 85, category: "visualization" },
  { id: 8, name: "D3.js", percentage: 80, category: "visualization" },
  { id: 9, name: "Plotly", percentage: 85, category: "visualization" },
  { id: 10, name: "Matplotlib/Seaborn", percentage: 90, category: "visualization" },
  { id: 11, name: "TensorFlow", percentage: 85, category: "machine-learning" },
  { id: 12, name: "Scikit-learn", percentage: 80, category: "machine-learning" },
  { id: 13, name: "Keras", percentage: 75, category: "machine-learning" },
  { id: 14, name: "Pandas", percentage: 90, category: "machine-learning" },
  { id: 15, name: "NumPy", percentage: 90, category: "machine-learning" }
];

export default function Skills() {
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  const getProficiencyLevel = (percentage: number) => {
    if (percentage >= 80) return 'Expert';
    if (percentage >= 60) return 'Advanced';
    if (percentage >= 40) return 'Intermediate';
    return 'Basic';
  };

  const ProficiencyIndicator = ({ percentage }: { percentage: number }) => {
    const level = getProficiencyLevel(percentage);
    const levelClass = {
      Expert: 'text-green-500',
      Advanced: 'text-blue-500',
      Intermediate: 'text-yellow-500',
      Basic: 'text-gray-500'
    }[level];

    return (
      <div className="flex items-center">
        <span className={`text-sm font-medium ${levelClass} mr-2`}>{level}</span>
        <div className="flex">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full mx-0.5 ${i * 25 <= percentage ? levelClass : 'bg-gray-300 dark:bg-dark-600'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" ref={ref} className="py-20 bg-dark-100/50 dark:bg-dark-800/50">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn("up", 0.3)} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-3 py-1 rounded-full text-sm font-medium">Skills & Expertise</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Proficiency</h2>
          <p className="text-dark-600 dark:text-dark-300">My technical toolkit includes a range of data engineering, reporting, and AI/ML technologies that enable me to create end-to-end data solutions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div variants={fadeIn("right", 0.4)}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-primary-500 mr-2"><i className="ri-code-s-slash-line"></i></span>
              Data Engineering
            </h3>

            <div className="space-y-4">
              {skillsData.filter(skill => skill.category === "data-engineering").map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-medium mr-3">{skill.name}</span>
                  </div>
                  <ProficiencyIndicator percentage={skill.percentage} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.4)}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-secondary-500 mr-2"><i className="ri-pie-chart-line"></i></span>
              Reporting
            </h3>

            <div className="space-y-4">
              {skillsData.filter(skill => skill.category === "visualization").map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-medium mr-3">{skill.name}</span>
                  </div>
                  <ProficiencyIndicator percentage={skill.percentage} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn("left", 0.4)}>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-accent-500 mr-2"><i className="ri-brain-line"></i></span>
              AI & Machine Learning
            </h3>

            <div className="space-y-4">
              {skillsData.filter(skill => skill.category === "machine-learning").map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-medium mr-3">{skill.name}</span>
                  </div>
                  <ProficiencyIndicator percentage={skill.percentage} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeIn("up", 0.5)} className="mt-16 dark:bg-dark-800 rounded-xl shadow-lg p-6 md:p-8 border border-dark-200 dark:border-dark-700">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="text-accent-500 mr-2"><i className="ri-cloud-line"></i></span>
            Cloud & Infrastructure
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-amazon-line text-[#FF9900]"></i></div>
              <div className="font-medium">AWS</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-google-line text-[#4285F4]"></i></div>
              <div className="font-medium">Google Cloud</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-microsoft-line text-[#00A4EF]"></i></div>
              <div className="font-medium">Azure</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-docker-line text-[#2496ED]"></i></div>
              <div className="font-medium">Docker</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-terminal-box-line text-[#326CE5]"></i></div>
              <div className="font-medium">Kubernetes</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-git-branch-line text-[#F05032]"></i></div>
              <div className="font-medium">Git</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-server-line text-[#5A6875]"></i></div>
              <div className="font-medium">Terraform</div>
            </div>

            <div className="text-center p-4 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200">
              <div className="text-4xl mb-3"><i className="ri-database-2-line text-[#336791]"></i></div>
              <div className="font-medium">PostgreSQL</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
