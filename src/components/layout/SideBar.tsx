import {
  LayoutDashboard,
  CheckSquare,
  Calendar,

} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Tasks", icon: CheckSquare },
  { name: "Calendar", icon: Calendar },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-full border-r bg-background p-4">
      <h2 className="text-xl font-semibold mb-6">Task Manager</h2>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted transition"
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}