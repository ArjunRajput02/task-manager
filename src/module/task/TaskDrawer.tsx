import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addTask, updateTask } from "../../store/slice/taskSlice";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type TaskForm = {
  title: string;
  description: string;
  status: string;
};

export default function TaskDrawer({ open, setOpen, editingTask }: any) {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue, watch } = useForm<TaskForm>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
    },
  });

  const status = watch("status");

  
  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "todo",
      });
    }
  }, [editingTask, open, reset]);

  
  const onSubmit = (data: TaskForm) => {
    if (!data.title.trim()) return;

    if (editingTask) {
      dispatch(
        updateTask({
          id: editingTask.id,
          ...data,
        }),
      );
    } else {
      dispatch(
        addTask({
          id: Date.now().toString(),
          ...data,
        }),
      );
    }

    reset(); 
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>
            {editingTask ? "Update Task" : "Create New Task"}
          </DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          
          <Input placeholder="Task title" {...register("title")} />

          
          <Textarea
            placeholder="Task description"
            {...register("description")}
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
      </DrawerContent>
    </Drawer>
  );
}
