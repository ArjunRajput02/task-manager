import { createSlice } from "@reduxjs/toolkit";
import type { TaskState } from "../../utils/types";


const initialState: TaskState = {
  tasks: [],
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now().toString(),
        ...action.payload,
      });
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, setSearchQuery } =
  taskSlice.actions;
export default taskSlice.reducer;
