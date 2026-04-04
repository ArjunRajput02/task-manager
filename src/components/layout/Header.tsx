import { Menu, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b bg-background">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold hidden md:block">Dashboard</h1>
      </div>

      
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <Input placeholder="Search tasks..." className="rounded-full" />
      </div>

      <div className="flex items-center gap-3">
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>


      </div>
    </header>
  );
}
