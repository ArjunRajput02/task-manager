import { Menu, Bell, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/slice/taskSlice";
import type { HeaderProps } from "../../utils/types";
import { useState } from "react";

export default function Header({ onMenuClick }: HeaderProps) {
  const dispatch = useDispatch();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="flex items-center h-16 px-4 md:px-6 border-b bg-white shrink-0">
      <div className="flex items-center flex-1">
        {!mobileSearchOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      {mobileSearchOpen ? (
        <div className="flex items-center flex-1 gap-2 sm:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search tasks..."
              className="pl-9 pr-4 py-2 rounded-full bg-muted/50 border-none focus-visible:ring-1 w-full"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMobileSearchOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="relative w-full max-w-md hidden sm:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-9 pr-4 py-2 rounded-full bg-muted/50 border-none focus-visible:ring-1"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      )}

      <div className="flex items-center gap-2 flex-1 justify-end">
        {!mobileSearchOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
