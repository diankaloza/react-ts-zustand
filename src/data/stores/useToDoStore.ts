import create, { State, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "../helpers";

interface I_Task {
  id: string;
  title: string;
  createdAt: number;
}

interface I_ToDoStore {
  tasks: I_Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<I_ToDoStore>(
  devtools((set, get) => ({
    tasks: [],
    createTask: (title) => {
      const { tasks } = get();
      const newTask: I_Task = {
        id: generateId(),
        title,
        createdAt: Date.now(),
      };
      set({
        //tasks: [newTask].concat(tasks),
        tasks: [...tasks, newTask],
      });
    },
    updateTask: (id: string, title: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },
    removeTask: (id: string) => {
      const { tasks } = get();
      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
  }))
);
