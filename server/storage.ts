import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  messages, type Message, type InsertMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill operations
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private skills: Map<number, Skill>;
  private messages: Map<number, Message>;
  
  currentUserId: number;
  currentProjectId: number;
  currentSkillId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.skills = new Map();
    this.messages = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentSkillId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample projects
    const projectsData: InsertProject[] = [
      {
        title: "Real-Time 3D Printer Monitoring System",
        description: "Real-time monitoring for 3D printers with automated quality control: MQTT telemetry streaming, ML anomaly detection and Grafana dashboards, fully containerized with Docker.",
        imageUrl: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&q=80",
        categories: ["data-engineering", "machine-learning"],
        technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "Docker", "MLflow"],
        githubUrl: "https://github.com/JepStar990/3d-printing-mlops",
        liveUrl: "",
        featured: true,
        order: 1
      },
      {
        title: "Weather MLOps Forecasts",
        description: "Production-grade MLOps pipeline ingesting forecasts from five weather providers, measuring per-source error, and training a LightGBM ensemble champion - orchestrated hourly on free tiers.",
        imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
        categories: ["machine-learning", "data-engineering"],
        technologies: ["Python", "LightGBM", "PostgreSQL", "GitHub Actions", "FastAPI", "Gradio"],
        githubUrl: "https://github.com/JepStar990/weather-mlops-forecasts-v2",
        liveUrl: "https://jepstar990.github.io/weather-mlops-forecasts/",
        featured: true,
        order: 2
      },
      {
        title: "NYC TLC Fabric",
        description: "Medallion lakehouse analytics for NYC taxi trip data on Microsoft Fabric: bronze/silver/gold pipeline, a data contract, a Direct Lake semantic model and Power BI reporting.",
        imageUrl: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=600&q=80",
        categories: ["cloud", "data-engineering"],
        technologies: ["Microsoft Fabric", "PySpark", "T-SQL", "Power BI", "Data Factory"],
        githubUrl: "https://github.com/JepStar990/nyc-tlc-fabric",
        liveUrl: "",
        featured: true,
        order: 3
      },
      {
        title: "SiteQA",
        description: "Browser-only RAG extension that crawls and indexes entire websites locally with ONNX embeddings and an IndexedDB vector store, answering questions with cited, sanitized responses - no backend, BYOK.",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
        categories: ["machine-learning"],
        technologies: ["TypeScript", "RAG", "ONNX", "transformers.js", "IndexedDB", "DeepSeek"],
        githubUrl: "https://github.com/JepStar990/rag-site-qa",
        liveUrl: "",
        featured: true,
        order: 4
      },
      {
        title: "Real-Time Stock Monitoring System",
        description: "Distributed streaming application in Java: WebSocket market data into Kafka, Spark Structured Streaming moving averages and breakout detection, TimescaleDB storage and Grafana dashboards.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
        categories: ["data-engineering"],
        technologies: ["Java", "Scala", "Kafka", "Spark", "TimescaleDB", "Grafana"],
        githubUrl: "https://github.com/JepStar990/stock-monitor-system",
        liveUrl: "",
        featured: true,
        order: 5
      },
      {
        title: "Customer Lifecycle Dashboard",
        description: "End-to-end BI project on AdventureWorks 2019: SQL extraction and transformation, dimensional modeling, and Power BI and Tableau dashboards tracing the customer journey.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        categories: ["visualization"],
        technologies: ["SQL", "Power BI", "Tableau", "Data Modeling"],
        githubUrl: "https://github.com/JepStar990/customer-lifecycle-dashboard",
        liveUrl: "",
        featured: true,
        order: 6
      }
    ];

    const skillsData: InsertSkill[] = [
      // Data Engineering skills
      { name: "Python", percentage: 95, category: "data-engineering", order: 1 },
      { name: "SQL", percentage: 90, category: "data-engineering", order: 2 },
      { name: "Apache Spark", percentage: 85, category: "data-engineering", order: 3 },
      { name: "Airflow", percentage: 80, category: "data-engineering", order: 4 },
      { name: "Kafka", percentage: 75, category: "data-engineering", order: 5 },
      
      // Data Visualization skills
      { name: "Tableau", percentage: 90, category: "visualization", order: 1 },
      { name: "Power BI", percentage: 85, category: "visualization", order: 2 },
      { name: "D3.js", percentage: 80, category: "visualization", order: 3 },
      { name: "Plotly", percentage: 85, category: "visualization", order: 4 },
      { name: "Matplotlib/Seaborn", percentage: 90, category: "visualization", order: 5 }
    ];

    // Add projects
    projectsData.forEach(project => {
      this.createProject(project);
    });

    // Add skills
    skillsData.forEach(skill => {
      this.createSkill(skill);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => a.order - b.order);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => a.order - b.order);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const newSkill: Skill = { ...skill, id };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = { 
      ...message, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

// Export a singleton instance
export const storage = new MemStorage();
