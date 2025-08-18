import { TaskList } from "@/components/TaskList"
import { Layout } from "@/components/Layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock, Star } from "lucide-react"

// Sample data
const todayTasks = [
  {
    id: "1",
    title: "Review project proposals",
    description: "Go through the quarterly project proposals and prepare feedback",
    completed: false,
    priority: "high" as const,
    project: "Work",
    projectColor: "bg-success",
    dueDate: "Today",
    dueTime: "2:00 PM"
  },
  {
    id: "2", 
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables for the week",
    completed: false,
    priority: "medium" as const,
    project: "Personal",
    projectColor: "bg-primary",
    dueDate: "Today"
  },
  {
    id: "3",
    title: "Call dentist",
    description: "Schedule annual checkup appointment",
    completed: true,
    priority: "low" as const,
    project: "Personal", 
    projectColor: "bg-primary",
    dueDate: "Today"
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    description: "Create slides for Monday's client meeting",
    completed: false,
    priority: "high" as const,
    project: "Work",
    projectColor: "bg-success",
    dueDate: "Tomorrow",
    dueTime: "9:00 AM"
  }
]

const Index = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: todayTasks.length,
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Completed",
      value: todayTasks.filter(t => t.completed).length,
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "In Progress",
      value: todayTasks.filter(t => !t.completed).length,
      icon: Clock,
      color: "text-destructive"
    },
    {
      title: "High Priority",
      value: todayTasks.filter(t => t.priority === "high").length,
      icon: Star,
      color: "text-destructive"
    }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Good morning! 👋
          </h1>
          <p className="text-muted-foreground">
            You have {todayTasks.filter(t => !t.completed).length} tasks to complete today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="gradient-card border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Task List */}
        <TaskList 
          tasks={todayTasks}
          title="Today's Tasks"
          emptyMessage="No tasks for today. Time to relax! 🎉"
        />
      </div>
    </Layout>
  );
};

export default Index;
