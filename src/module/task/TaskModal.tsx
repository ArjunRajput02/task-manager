import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addTask, updateTask } from "../../store/slice/taskSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

import type { Task } from "../../utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function TaskModal({ open, setOpen, editingTask }: any) {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue, watch } = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      dueDate: "",
    },
  });

  const status = watch("status");

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        dueDate: editingTask.dueDate,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
        dueDate: "",
      });
    }
  }, [editingTask, open, reset]);

  const onSubmit = (data: Task) => {
    if (!data.title.trim()) return;

    if (editingTask) {
      dispatch(
        updateTask({
          ...data,
          id: editingTask.id,
        }),
      );
    } else {
      dispatch(addTask({ ...data }));
    }

    reset();
    setOpen(false);
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {editingTask ? "Update Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Task title" {...register("title")} />

          <Textarea
            placeholder="Task description"
            {...register("description")}
          />

          <input
            type="date"
            {...register("dueDate")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Select
            value={status}
            onValueChange={(value) => setValue("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
