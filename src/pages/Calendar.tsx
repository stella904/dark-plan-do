import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { taskStore } from "@/lib/taskStore";
import { Task } from "@/types/task";

const Calendar = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setTasks(taskStore.getAllTasks());
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toDateString();
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      if (task.dueDate === "Today" || task.dueDate === "Tomorrow") {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (task.dueDate === "Today") {
          return today.toDateString() === dateString;
        } else {
          return tomorrow.toDateString() === dateString;
        }
      }
      return new Date(task.dueDate).toDateString() === dateString;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-border/50"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayTasks = getTasksForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-border/50 p-2 cursor-pointer hover:bg-accent/50 transition-colors ${
            isToday ? 'bg-primary/10 border-primary/50' : ''
          } ${isSelected ? 'bg-accent border-accent-foreground' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map(task => (
              <div
                key={task.id}
                className={`text-xs p-1 rounded truncate ${
                  task.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                  task.priority === 'medium' ? 'bg-primary/20 text-primary' :
                  'bg-success/20 text-success'
                }`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayTasks.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Calendar View 📅
          </h1>
          <p className="text-muted-foreground">
            Visualize your tasks across time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border border-border p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0 border border-border/50">
                {renderCalendarDays()}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Tasks */}
            <Card className="gradient-card border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select a Date'}
              </h3>
              
              {selectedDate ? (
                <div className="space-y-3">
                  {selectedDateTasks.length > 0 ? (
                    selectedDateTasks.map(task => (
                      <div key={task.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{task.title}</h4>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.project}
                          </Badge>
                          {task.dueTime && (
                            <Badge variant="outline" className="text-xs">
                              {task.dueTime}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No tasks scheduled for this date
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Click on a date to view tasks
                </p>
              )}
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                This Month
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tasks</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-success">
                    {tasks.filter(t => t.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High Priority</span>
                  <span className="font-medium text-destructive">
                    {tasks.filter(t => t.priority === 'high').length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;