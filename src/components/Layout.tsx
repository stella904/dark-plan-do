import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Search, Bell, User } from "lucide-react";
import { signInWithGoogle } from "@/App";
import UserProfile from "./ui/UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className='min-h-screen flex w-full bg-background'>
        <AppSidebar />

        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <header className='h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between h-full px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='hover:bg-accent' />
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <input
                    type='text'
                    placeholder='Search tasks...'
                    className='pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-64'
                  />
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Button variant='ghost' size='sm'>
                  <Bell className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={signInWithGoogle}>
                  {/* <User className="h-4 w-4" /> */}
                  <UserProfile />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className='flex-1 p-6'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
