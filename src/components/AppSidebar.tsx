import { Calendar, CheckSquare, Clock, Home, Plus, Settings } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: "Today", url: "/", icon: Home },
  { title: "Upcoming", url: "/upcoming", icon: Clock },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Completed", url: "/completed", icon: CheckSquare },
]

const projects = [
  { title: "Personal", color: "bg-primary", tasks: 5 },
  { title: "Work", color: "bg-success", tasks: 8 },
  { title: "Shopping", color: "bg-destructive", tasks: 3 },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-l-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="gradient-card border-r border-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Plan your day</p>
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <div className="p-4">
          <Button 
            variant="primary" 
            className={`w-full ${collapsed ? "px-2" : ""}`}
          >
            <Plus className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Add Task</span>}
          </Button>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-4">
              Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.title}>
                    <SidebarMenuButton className="hover:bg-accent/50 text-muted-foreground hover:text-foreground">
                      <div className={`h-3 w-3 rounded-full ${project.color}`} />
                      <span className="ml-3">{project.title}</span>
                      <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {project.tasks}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings */}
        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenuButton className="hover:bg-accent/50 text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}