import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/slice/taskSlice";
import type { RootState } from "../../store/store";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, Plus, Pencil } from "lucide-react";
import TaskDrawer from "./TaskDrawer";

export default function TaskPage() {
  console.log("TaskPage rendered");
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks?.tasks || []);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Tasks</h1>

        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No tasks yet. Add one
          </p>
        )}

        {tasks.map((t) => (
          <Card
            key={t.id}
            className="rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingTask(t);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(deleteTask(t.id))}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              {t.description && (
                <p className="text-sm text-muted-foreground">{t.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskDrawer
        open={open}
        setOpen={(val) => {
          setOpen(val);
          if (!val) setEditingTask(null);
        }}
        editingTask={editingTask}
      />
    </div>
  );
}
