export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  project: string;
  projectColor: string;
  dueDate?: string;
  dueTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  highPriority: number;
}