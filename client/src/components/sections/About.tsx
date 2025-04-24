import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function About() {
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div variants={fadeIn("right", 0.3)} className="md:w-1/3">
            <div className="relative">
              <div className="w-full h-80 bg-gradient-primary rounded-lg relative overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                     alt="my profile picture" 
                     className="w-full h-full object-cover opacity-99"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="flex justify-center mb-3">
                      <i className="ri-database-2-line text-5xl"></i>
                    </div>
                    <h3 className="text-xl font-bold">Data Engineer</h3>
                    <p className="text-sm opacity-80">1.5+ Years Experience</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dark-100 dark:bg-dark-800 rounded-lg shadow-lg flex items-center justify-center">
                <i className="ri-code-s-slash-line text-4xl text-primary-500"></i>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn("left", 0.3)} className="md:w-2/3">
            <div className="inline-block mb-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">About Me</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforming Raw Data into Insights</h2>
            
            <div className="space-y-4 text-dark-700 dark:text-dark-300">
              <p>
                With a background in computer science and a passion for data, I specialize in building scalable data pipelines and creating insightful visualizations that drive business decisions.
              </p>
              <p>
                I've worked across various industries, including telematics and fleet management, helping organizations harness the power of their data through efficient ETL processes, data warehousing, and interactive dashboards.
              </p>
              <p>
                My expertise includes Python, Java, SQL, Apache Spark, Azure Synapse, Power BI, and various cloud platforms. I'm passionate about solving complex data challenges and making information accessible and actionable.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="dark:bg-dark-800 p-4 rounded-lg shadow border border-dark-200 dark:border-dark-700">
                <div className="text-primary-500 text-2xl mb-2"><i className="ri-database-2-line"></i></div>
                <h4 className="font-bold">Data Engineering</h4>
              </div>
              <div className="dark:bg-dark-800 p-4 rounded-lg shadow border border-dark-200 dark:border-dark-700">
                <div className="text-primary-500 text-2xl mb-2"><i className="ri-pie-chart-2-line"></i></div>
                <h4 className="font-bold">Data Visualization</h4>
              </div>
              <div className="dark:bg-dark-800 p-4 rounded-lg shadow border border-dark-200 dark:border-dark-700">
                <div className="text-primary-500 text-2xl mb-2"><i className="ri-cloud-line"></i></div>
                <h4 className="font-bold">Cloud Computing</h4>
              </div>
              <div className="dark:bg-dark-800 p-4 rounded-lg shadow border border-dark-200 dark:border-dark-700">
                <div className="text-primary-500 text-2xl mb-2"><i className="ri-flow-chart"></i></div>
                <h4 className="font-bold">ETL Pipelines</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
