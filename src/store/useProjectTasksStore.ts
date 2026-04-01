import { create } from "zustand";
import { GetDetailsTaskProject } from "../features/task/api";
import type { Task } from "@/types/task";

type ProjectTasksState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (projectId: string) => Promise<void>;
};

export const useProjectTasksStore = create<ProjectTasksState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async (projectId: string) => {
    set({ loading: true, error: null });
    try {
      const result = await GetDetailsTaskProject({ id: projectId });
      set({
        tasks: result?.data?.tasks || [],
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || "Erreur lors du chargement des tâches",
      });
    }
  },
}));