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
        title: "Real-time Data Dashboard",
        description: "Built an end-to-end solution for monitoring IoT sensor data with real-time analytics and alerts.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        categories: ["data-engineering", "visualization"],
        technologies: ["Apache Kafka", "Spark Streaming", "Tableau", "AWS"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: true,
        order: 1
      },
      {
        title: "Cloud Data Warehouse",
        description: "Designed and implemented a scalable data warehouse solution on AWS to consolidate data from multiple sources.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        categories: ["data-engineering", "cloud"],
        technologies: ["AWS Redshift", "S3", "Airflow", "Python"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: true,
        order: 2
      },
      {
        title: "Predictive Analytics Dashboard",
        description: "Created an interactive dashboard with machine learning models to predict customer behavior and business trends.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        categories: ["visualization", "machine-learning"],
        technologies: ["Scikit-learn", "D3.js", "React", "Flask"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: true,
        order: 3
      },
      {
        title: "ETL Pipeline Automation",
        description: "Developed a robust ETL system that automates data extraction, transformation, and loading processes.",
        imageUrl: "https://miro.medium.com/v2/resize:fit:1400/0*1YAwjo9ByzbuJS-9https://miro.medium.com/v2/resize:fit:1400/0*1YAwjo9ByzbuJS-9",
        categories: ["data-engineering"],
        technologies: ["Airflow", "Python", "Docker", "PostgreSQL"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: true,
        order: 4
      },
      {
        title: "Interactive Financial Dashboard",
        description: "Designed a comprehensive financial dashboard with interactive charts and drill-down capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        categories: ["visualization"],
        technologies: ["Tableau", "SQL", "Power BI"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
        featured: true,
        order: 5
      },
      {
        title: "ML Model Deployment",
        description: "Built and deployed machine learning models in a cloud environment with automated retraining capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        categories: ["machine-learning", "cloud"],
        technologies: ["TensorFlow", "GCP", "Kubernetes", "MLflow"],
        githubUrl: "https://github.com",
        liveUrl: "https://example.com",
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
