import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/slice/taskSlice";
import type { RootState } from "../../store/store";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, Plus, Pencil } from "lucide-react";
import TaskDrawer from "./TaskDrawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import type { Task } from "../../utils/types";

export default function TaskPage() {
  const dispatch = useDispatch();
  const { tasks, searchQuery } = useSelector((state: RootState) => state.tasks);
  const filteredTasks = tasks.filter((t) =>
    `${t.title} ${t.description || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim()),
  );
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Tasks</h1>

        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center col-span-full">
            No tasks yet. Add one
          </p>
        )}

        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
              <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                {task.title || "Untitled Task"}
              </h2>

              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {task.description}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingTask(task);
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="sm:max-w-md rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your task.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel variant="destructive" size="default">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        size="default"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskDrawer
        open={open}
        setOpen={(val:boolean) => {
          setOpen(val);
          if (!val) setEditingTask(null);
        }}
        editingTask={editingTask}
      />
    </div>
  );
}
