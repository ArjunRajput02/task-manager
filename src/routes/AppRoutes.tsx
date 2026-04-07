import { Routes, Route } from "react-router-dom";
import LayoutWrapper from "./LayoutWrapper";
import TaskPage from "../module/task/TaskPage";
import CalendarPage from "../module/calender/CalenderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<TaskPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}
