import { useState, useEffect } from "react"
import { TaskCard } from "./TaskCard"

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

interface TaskListProps {
  tasks: Task[]
  title: string
  emptyMessage?: string
  onToggleComplete?: (id: string) => void
  showDeleteButton?: boolean
  onDelete?: (id: string) => void
}

export function TaskList({ 
  tasks, 
  title, 
  emptyMessage = "No tasks found",
  onToggleComplete,
  showDeleteButton = false,
  onDelete
}: TaskListProps) {
  const [taskList, setTaskList] = useState(tasks)

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  const handleToggleComplete = (id: string) => {
    if (onToggleComplete) {
      onToggleComplete(id)
    } else {
      setTaskList(prev => 
        prev.map(task => 
          task.id === id 
            ? { ...task, completed: !task.completed }
            : task
        )
      )
    }
  }

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-1">
            {taskList.filter(t => !t.completed).length} of {taskList.length} tasks remaining
          </p>
        </div>
      </div>

      {taskList.length === 0 ? (
        <div className="text-center py-12">
          <div className="gradient-glow rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl text-muted-foreground">📝</div>
          </div>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {taskList.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggleComplete={handleToggleComplete}
              showDeleteButton={showDeleteButton}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}