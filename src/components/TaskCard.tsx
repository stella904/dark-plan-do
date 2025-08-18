import { useState } from "react"
import { CheckCircle2, Circle, Star, Calendar, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  project: string
  projectColor: string
  dueDate?: string
  dueTime?: string
}

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onEdit?: (id: string) => void
  showDeleteButton?: boolean
  onDelete?: (id: string) => void
}

export function TaskCard({ task, onToggleComplete, onEdit, showDeleteButton = false, onDelete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    setTimeout(() => {
      onToggleComplete(task.id)
      setIsCompleting(false)
    }, 300)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive"
      case "medium": return "bg-primary"
      case "low": return "bg-success"
      default: return "bg-muted"
    }
  }

  return (
    <Card 
      className={`
        gradient-card border border-border hover:shadow-hover transition-all duration-300 p-4
        ${task.completed ? "opacity-60" : ""}
        ${isCompleting ? "task-complete" : ""}
        task-slide-in
      `}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-6 w-6 rounded-full hover:bg-primary/20"
          onClick={handleToggleComplete}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className={`
                font-medium text-foreground 
                ${task.completed ? "line-through text-muted-foreground" : ""}
              `}
            >
              {task.title}
            </h3>
            
            {task.priority === "high" && (
              <Star className="h-4 w-4 text-destructive fill-destructive" />
            )}
          </div>

          {task.description && (
            <p className={`
              text-sm text-muted-foreground mb-2 
              ${task.completed ? "line-through" : ""}
            `}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="secondary" 
              className="text-xs"
            >
              <div className={`h-2 w-2 rounded-full ${task.projectColor} mr-2`} />
              {task.project}
            </Badge>

            {task.dueDate && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {task.dueDate}
              </Badge>
            )}

            {task.dueTime && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {task.dueTime}
              </Badge>
            )}

            <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)} ml-auto`} />
          </div>
        </div>

        {showDeleteButton && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}