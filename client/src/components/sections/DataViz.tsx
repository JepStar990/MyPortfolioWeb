import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { BarChart, LineChart, PieChart, ChartBarStacked } from "lucide-react";

type ChartType = "bar" | "pie" | "line" | "scatter";

export default function DataViz() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [selectedDataset, setSelectedDataset] = useState("Q3 2023 Dataset");
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-dark-100/50 dark:bg-dark-800/50 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn("up", 0.3)} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 px-3 py-1 rounded-full text-sm font-medium">Interactive Preview</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Visualization Showcase</h2>
          <p className="text-dark-600 dark:text-dark-300">Experience the power of interactive data visualizations that bring complex datasets to life.</p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn("up", 0.4)}
          className="dark:bg-dark-800 rounded-xl shadow-lg p-6 md:p-8 border border-dark-200 dark:border-dark-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-dark-50 dark:bg-dark-900 rounded-lg p-6 h-80 flex items-center justify-center">
                {activeChart === "bar" && (
                  <div className="w-full h-full flex items-end justify-around">
                    {[30, 45, 60, 75, 90, 80, 70, 60, 40, 20].map((height, index) => (
                      <motion.div
                        key={index}
                        className={`w-1/12 bg-primary-${index < 5 ? '500' : index < 8 ? '600' : '700'} h-full`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        style={{ 
                          transformOrigin: 'bottom',
                          height: `${height}%`
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {activeChart === "pie" && (
                  <div className="w-64 h-64 relative">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <motion.circle 
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="rgb(56, 189, 248)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 62.8 }}
                        transition={{ duration: 1 }}
                      />
                      <motion.circle 
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="rgb(99, 102, 241)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -75.4 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <motion.circle 
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="rgb(244, 114, 182)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="-75.4" 
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -188.4 }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </svg>
                  </div>
                )}
                
                {activeChart === "line" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="100%" height="80%" viewBox="0 0 300 100">
                      <motion.path
                        d="M0,80 C30,70 50,30 90,30 C130,30 150,60 190,60 C230,60 260,10 300,10"
                        fill="transparent"
                        stroke="rgb(56, 189, 248)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                      />
                      <motion.path
                        d="M0,90 C40,80 60,50 100,50 C140,50 160,20 200,20 C240,20 270,40 300,40"
                        fill="transparent"
                        stroke="rgb(99, 102, 241)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </svg>
                  </div>
                )}
                
                {activeChart === "scatter" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 300 200">
                      {Array.from({ length: 30 }).map((_, i) => {
                        const x = 20 + Math.random() * 260;
                        const y = 20 + Math.random() * 160;
                        const size = 3 + Math.random() * 8;
                        
                        return (
                          <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={size}
                            fill={
                              i % 3 === 0
                                ? "rgb(56, 189, 248)"
                                : i % 3 === 1
                                ? "rgb(99, 102, 241)"
                                : "rgb(244, 114, 182)"
                            }
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.7 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                )}
              </Card>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button
                  variant={activeChart === "bar" ? "default" : "outline"}
                  className="p-3 justify-center"
                  onClick={() => setActiveChart("bar")}
                >
                  <div className="flex flex-col items-center">
                    <BarChart className="h-5 w-5 mb-1 text-current" />
                    <span className="text-sm">Bar Chart</span>
                  </div>
                </Button>
                
                <Button
                  variant={activeChart === "pie" ? "default" : "outline"}
                  className="p-3 justify-center"
                  onClick={() => setActiveChart("pie")}
                >
                  <div className="flex flex-col items-center">
                    <PieChart className="h-5 w-5 mb-1 text-current" />
                    <span className="text-sm">Pie Chart</span>
                  </div>
                </Button>
                
                <Button
                  variant={activeChart === "line" ? "default" : "outline"}
                  className="p-3 justify-center"
                  onClick={() => setActiveChart("line")}
                >
                  <div className="flex flex-col items-center">
                    <LineChart className="h-5 w-5 mb-1 text-current" />
                    <span className="text-sm">Line Chart</span>
                  </div>
                </Button>
                
                <Button
                  variant={activeChart === "scatter" ? "default" : "outline"}
                  className="p-3 justify-center"
                  onClick={() => setActiveChart("scatter")}
                >
                  <div className="flex flex-col items-center">
                    <ChartBarStacked className="h-5 w-5 mb-1 text-current" />
                    <span className="text-sm">Scatter Plot</span>
                  </div>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Data Insights</h3>
              <div className="space-y-6">
                <div className="bg-dark-50 dark:bg-dark-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Records</span>
                    <span className="text-lg font-bold">24,583</span>
                  </div>
                  <div className="w-full bg-dark-200 dark:bg-dark-700 h-1.5 rounded-full">
                    <motion.div 
                      className="bg-primary-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                
                <div className="bg-dark-50 dark:bg-dark-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Completion Rate</span>
                    <span className="text-lg font-bold">68%</span>
                  </div>
                  <div className="w-full bg-dark-200 dark:bg-dark-700 h-1.5 rounded-full">
                    <motion.div 
                      className="bg-secondary-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
                
                <div className="bg-dark-50 dark:bg-dark-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Growth Rate</span>
                    <span className="text-lg font-bold text-green-500">+42%</span>
                  </div>
                  <div className="w-full bg-dark-200 dark:bg-dark-700 h-1.5 rounded-full">
                    <motion.div 
                      className="bg-green-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">Data Source</h4>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dataset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Q3 2023 Dataset">Q3 2023 Dataset</SelectItem>
                          <SelectItem value="Q2 2023 Dataset">Q2 2023 Dataset</SelectItem>
                          <SelectItem value="Q1 2023 Dataset">Q1 2023 Dataset</SelectItem>
                          <SelectItem value="Q4 2022 Dataset">Q4 2022 Dataset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      Load
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
