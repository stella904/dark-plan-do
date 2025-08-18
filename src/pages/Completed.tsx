import { useState, useEffect } from "react";
import { TaskList } from "@/components/TaskList";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trophy, Target, Calendar, Trash2 } from "lucide-react";
import { taskStore } from "@/lib/taskStore";
import { Task } from "@/types/task";

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    setCompletedTasks(taskStore.getCompletedTasks());
  }, []);

  const handleToggleComplete = (id: string) => {
    taskStore.toggleTaskComplete(id);
    setCompletedTasks(taskStore.getCompletedTasks());
  };

  const handleDeleteTask = (id: string) => {
    taskStore.deleteTask(id);
    setCompletedTasks(taskStore.getCompletedTasks());
  };

  const clearAllCompleted = () => {
    completedTasks.forEach(task => {
      taskStore.deleteTask(task.id);
    });
    setCompletedTasks([]);
  };

  const getCompletedStats = () => {
    const today = new Date().toDateString();
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);

    const completedToday = completedTasks.filter(task => 
      task.updatedAt && new Date(task.updatedAt).toDateString() === today
    );

    const completedThisWeek = completedTasks.filter(task => 
      task.updatedAt && new Date(task.updatedAt) >= thisWeek
    );

    const highPriorityCompleted = completedTasks.filter(task => 
      task.priority === "high"
    );

    return {
      total: completedTasks.length,
      today: completedToday.length,
      thisWeek: completedThisWeek.length,
      highPriority: highPriorityCompleted.length
    };
  };

  const stats = getCompletedStats();

  const statsCards = [
    {
      title: "Total Completed",
      value: stats.total,
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Completed Today",
      value: stats.today,
      icon: Target,
      color: "text-primary"
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: Calendar,
      color: "text-success"
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: Trophy,
      color: "text-destructive"
    }
  ];

  const getMotivationalMessage = () => {
    if (stats.total === 0) {
      return "Complete your first task to start building momentum! 💪";
    } else if (stats.total < 5) {
      return "Great start! Keep the momentum going! 🚀";
    } else if (stats.total < 20) {
      return "You're on fire! Excellent progress! 🔥";
    } else {
      return "Incredible productivity! You're a task-completing machine! 🏆";
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-2">
            Completed Tasks ✅
          </h1>
          <p className="text-muted-foreground">
            {getMotivationalMessage()}
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

        {/* Achievement Badge */}
        {stats.total >= 10 && (
          <Card className="gradient-card border border-success/50 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="gradient-glow rounded-full w-16 h-16 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-success">Achievement Unlocked!</h3>
                <p className="text-muted-foreground">
                  You've completed {stats.total} tasks! You're a productivity champion! 🎉
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        {completedTasks.length > 0 && (
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              onClick={clearAllCompleted}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Completed
            </Button>
          </div>
        )}

        {/* Task List */}
        <TaskList 
          tasks={completedTasks}
          title="Completed Tasks"
          emptyMessage="No completed tasks yet. Start checking off some tasks! 📝"
          onToggleComplete={handleToggleComplete}
          showDeleteButton={true}
          onDelete={handleDeleteTask}
        />
      </div>
    </Layout>
  );
};

export default Completed;