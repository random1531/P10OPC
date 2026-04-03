import { create } from "zustand";
import type { Project } from "@/types/project";
import { GetProject, CreateProject, DeleteProject } from "@/features/project/api";


type ProjectStoreState = {
    projects: Project[];
    loading: boolean;
    error: string | null;
    fetchProjects: () => Promise<void>;
    addProject: (title: string, description: string, userIds: string[]) => Promise<boolean>;
    deleteProject: (id: string) => Promise<boolean>;
};

export const useProjectStore = create<ProjectStoreState>((set) => ({

    projects: [],
    loading: false,
    error: null,
    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            const result = await GetProject();

            if (result.success) {

                const projects = Array.isArray(result.data.projects) ? result.data.projects : [];
                set({ projects, loading: false });
            } else {
                set({ projects: [], loading: false, error: result.message });
            }
        } catch (error: any) {

            set({ projects: [], loading: false, error: error?.message || "Erreur inconnue" });
        }
    },
    addProject: async (title, description, userIds) => {
        set({ loading: true, error: null });
        try {
            const result = await CreateProject({ Title: title, description, userIds });
            if (result.success) {

                const projectsResult = await GetProject();
                if (projectsResult.success) {
                    const projects = Array.isArray(projectsResult.data.projects) ? projectsResult.data.projects : [];
                    set({ projects, loading: false });
                } else {
                    set({ loading: false });
                }
                return true;
            } else {
                set({ loading: false, error: result.message });
                return false;
            }
        } catch (error: any) {
            set({ loading: false, error: error?.message || "Erreur inconnue" });
            return false;
        }
    },

    deleteProject: async (id) => {
        set({ loading: true, error: null });
        try {
            const result = await DeleteProject({ id });
            if (result.success) {

                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                    loading: false,
                }));
                return true;
            } else {
                set({ loading: false, error: result.message });
                return false;
            }
        } catch (error: any) {
            set({ loading: false, error: error?.message || "Erreur inconnue" });
            return false;
        }
    },
}));