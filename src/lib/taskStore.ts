import { Task, Project, TaskStats } from "@/types/task";

class TaskStore {
  private tasks: Task[] = [];
  private projects: Project[] = [
    { id: "1", name: "Personal", color: "bg-primary", taskCount: 0 },
    { id: "2", name: "Work", color: "bg-success", taskCount: 0 },
    { id: "3", name: "Shopping", color: "bg-destructive", taskCount: 0 },
  ];

  constructor() {
    this.loadFromStorage();
    this.initializeSampleData();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks');
      const storedProjects = localStorage.getItem('projects');
      
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
      }
      
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  private initializeSampleData() {
    if (this.tasks.length === 0) {
      const sampleTasks: Task[] = [
        {
          id: "1",
          title: "Review project proposals",
          description: "Go through the quarterly project proposals and prepare feedback",
          completed: false,
          priority: "high",
          project: "Work",
          projectColor: "bg-success",
          dueDate: "Today",
          dueTime: "2:00 PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "2",
          title: "Buy groceries",
          description: "Milk, eggs, bread, and vegetables for the week",
          completed: false,
          priority: "medium",
          project: "Personal",
          projectColor: "bg-primary",
          dueDate: "Today",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "3",
          title: "Call dentist",
          description: "Schedule annual checkup appointment",
          completed: true,
          priority: "low",
          project: "Personal",
          projectColor: "bg-primary",
          dueDate: "Today",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "4",
          title: "Prepare presentation slides",
          description: "Create slides for Monday's client meeting",
          completed: false,
          priority: "high",
          project: "Work",
          projectColor: "bg-success",
          dueDate: "Tomorrow",
          dueTime: "9:00 AM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "5",
          title: "Team meeting",
          description: "Weekly standup with the development team",
          completed: false,
          priority: "medium",
          project: "Work",
          projectColor: "bg-success",
          dueDate: "2024-01-15",
          dueTime: "10:00 AM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "6",
          title: "Gym workout",
          description: "Cardio and strength training session",
          completed: true,
          priority: "low",
          project: "Personal",
          projectColor: "bg-primary",
          dueDate: "Yesterday",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      this.tasks = sampleTasks;
      this.updateProjectCounts();
      this.saveToStorage();
    }
  }

  private updateProjectCounts() {
    this.projects = this.projects.map(project => ({
      ...project,
      taskCount: this.tasks.filter(task => task.project === project.name).length
    }));
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTodayTasks(): Task[] {
    const today = new Date().toDateString();
    return this.tasks.filter(task => 
      task.dueDate === "Today" || 
      (task.dueDate && new Date(task.dueDate).toDateString() === today)
    );
  }

  getUpcomingTasks(): Task[] {
    const today = new Date();
    return this.tasks.filter(task => {
      if (!task.dueDate || task.dueDate === "Today") return false;
      const dueDate = new Date(task.dueDate);
      return dueDate > today;
    }).sort((a, b) => {
      const dateA = new Date(a.dueDate!);
      const dateB = new Date(b.dueDate!);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  getTaskStats(): TaskStats {
    return {
      total: this.tasks.length,
      completed: this.tasks.filter(t => t.completed).length,
      inProgress: this.tasks.filter(t => !t.completed).length,
      highPriority: this.tasks.filter(t => t.priority === "high").length
    };
  }

  addTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.push(newTask);
    this.updateProjectCounts();
    this.saveToStorage();
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    this.updateProjectCounts();
    this.saveToStorage();
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    if (this.tasks.length < initialLength) {
      this.updateProjectCounts();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  toggleTaskComplete(id: string): Task | null {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return null;

    task.completed = !task.completed;
    task.updatedAt = new Date();
    
    this.saveToStorage();
    return task;
  }

  getProjects(): Project[] {
    return [...this.projects];
  }

  addProject(name: string, color: string): Project {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      color,
      taskCount: 0
    };
    
    this.projects.push(newProject);
    this.saveToStorage();
    return newProject;
  }
}

export const taskStore = new TaskStore();