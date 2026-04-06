import { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import MobileSidebar from "./MobileSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex md:w-64 md:shrink-0">
        <Sidebar />
      </div>

      <MobileSidebar open={open} onClose={() => setOpen(false)} />

      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
