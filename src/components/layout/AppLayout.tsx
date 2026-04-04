import { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import MobileSidebar from "./MobileSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  console.log("drawer state:", open);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar open={open} onClose={setOpen} />

      <div className="flex flex-col flex-1">

        <Header onMenuClick={() => setOpen(true)} />

        <main className="flex-1 p-4 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}
