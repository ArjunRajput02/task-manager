import { navItems } from "../../utils/constant";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-blue-700 p-4">
      <h2 className="text-xl font-semibold mb-6 text-white">Task Manager</h2>
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition text-white"
            >
              <Icon className="h-5 w-5 text-blue-200" />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
