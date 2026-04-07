import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import { format, isToday as isTodayDate, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RootState } from "../../store/store";

const STATUS_STYLES: Record<string, string> = {
  todo: "bg-blue-100 text-blue-800",
  inprogress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

export default function CalendarPage() {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [current, setCurrent] = useState(new Date());

  const getTasksForDate = (date: Date) =>
    tasks.filter((t) => t.dueDate === format(date, "yyyy-MM-dd"));

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrent(subMonths(current, 1))}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <h1 className="text-xl font-bold text-gray-800">
          {format(current, "MMMM yyyy")}
        </h1>

        <button
          onClick={() => setCurrent(addMonths(current, 1))}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    
      <Calendar
        value={current}
        onChange={(value) => setCurrent(value as Date)}
        view="month"
        showNavigation={false} 
        tileContent={({ date, view }) => {
          if (view !== "month") return null;
          const dayTasks = getTasksForDate(date);
          const today = isTodayDate(date);

          return (
            <div className="flex flex-col gap-0.5 mt-1 relative">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  title={task.title}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium truncate ${
                    STATUS_STYLES[task.status] ?? "bg-gray-200 text-gray-700"
                  }`}
                >
                  {task.title}
                </div>
              ))}
              {today && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
          );
        }}
        tileClassName={({ date }) => {
          const isCurrentMonth = date.getMonth() === current.getMonth();
          const today = isTodayDate(date);

          return [
            "relative min-h-[100px] border rounded-lg p-2 transition-all shadow-sm flex flex-col",
            isCurrentMonth
              ? "bg-white border-gray-200"
              : "bg-gray-100 border-gray-100 opacity-50",
            today ? "border-blue-400 bg-blue-50" : "",
          ].join(" ");
        }}
      />
    </div>
  );
}