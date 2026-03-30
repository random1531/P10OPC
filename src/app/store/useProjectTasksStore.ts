import { create } from "zustand";
import { GetDetailsTaskProject, TaskProject } from "../(protected)/function";

type ProjectTasksState = {
  tasks: TaskProject[];
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