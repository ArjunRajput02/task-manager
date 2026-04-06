import { createSlice, nanoid } from "@reduxjs/toolkit";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
};

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (task: Omit<Task, "id">) => ({
        payload: {
          id: nanoid(),
          ...task,
        },
      }),
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action) => {
      const { id, title, description, status } = action.payload;

      const task = state.tasks.find((t) => t.id === id);

      if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
