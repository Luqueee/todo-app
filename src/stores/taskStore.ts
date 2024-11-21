import type { Task } from "@/db/task/schema";
import { create } from "zustand";

interface TaskStore {
  currentTask: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    dueDate?: string;
  };
  setTask: (task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    dueDate?: string;
  }) => void;
}

const useTaskStore = create<TaskStore>()((set) => ({
  currentTask: {
    id: "",
    title: "",
    description: "",
    completed: false,
    category: "",
    dueDate: "",
  },
  setTask: (task) => set({ currentTask: task }),
}));

export default useTaskStore;
