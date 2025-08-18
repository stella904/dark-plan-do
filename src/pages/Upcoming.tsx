import { useState, useEffect } from "react";
import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { taskStore } from "@/lib/taskStore";
import { Task } from "@/types/task";

const Upcoming = () => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    setUpcomingTasks(taskStore.getUpcomingTasks());
  }, []);

  const handleToggleComplete = (id: string) => {
    taskStore.toggleTaskComplete(id);
    setUpcomingTasks(taskStore.getUpcomingTasks());
  };

  const getUpcomingStats = () => {
    const thisWeek = upcomingTasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate <= weekFromNow;
    });

    const overdue = upcomingTasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today && !task.completed;
    });

    return {
      total: upcomingTasks.length,
      thisWeek: thisWeek.length,
      overdue: overdue.length,
      highPriority: upcomingTasks.filter(t => t.priority === "high").length
    };
  };

  const stats = getUpcomingStats();

  const statsCards = [
    {
      title: "Total Upcoming",
      value: stats.total,
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: Clock,
      color: "text-success"
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      color: "text-destructive"
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: TrendingUp,
      color: "text-destructive"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Upcoming Tasks 📅
          </h1>
          <p className="text-muted-foreground">
            Plan ahead and stay organized with your future tasks
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat) => (
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

        {/* Overdue Tasks Alert */}
        {stats.overdue > 0 && (
          <Card className="gradient-card border border-destructive/50 p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">Overdue Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  You have {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''} that need attention
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Task List */}
        <TaskList 
          tasks={upcomingTasks}
          title="Upcoming Tasks"
          emptyMessage="No upcoming tasks scheduled. You're all caught up! ✨"
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </Layout>
  );
};

export default Upcoming;