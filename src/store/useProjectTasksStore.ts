import { create } from "zustand";
import { GetDetailsTaskProject } from "../features/task/api";
import { GetTasksComment, SendComments, DeleteComment } from "@/features/comments/api";
import type { Task, Comment } from "@/types/task";

type ProjectTasksState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (projectId: string) => Promise<void>;
  refreshComments: (projectId: string, taskId: string) => Promise<void>;
  addComment: (projectId: string, taskId: string, content: string) => Promise<boolean>;
  deleteComment: (projectId: string, taskId: string, commentId: string) => Promise<boolean>;
};

export const useProjectTasksStore = create<ProjectTasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async (projectId: string) => {
    set({ loading: true, error: null });
    try {
      const result = await GetDetailsTaskProject({ id: projectId });
      if (result.success) {
        const tasks = Array.isArray(result.data.tasks) ? result.data.tasks : [];
        set({ tasks, loading: false });
      } else {
        set({ tasks: [], loading: false, error: result.message });
      }
    } catch (err: any) {
      set({ loading: false, error: err.message || "Erreur lors du chargement des tâches" });
    }
  },

  refreshComments: async (projectId: string, taskId: string) => {
    try {
      const result = await GetTasksComment({ ProjectId: projectId, tasksID: taskId });
      if (result.success) {
        const comments = Array.isArray(result.data) ? result.data : [];

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, comments } : task
          ),
        }));
      }
    } catch (err: any) {

    }
  },

  addComment: async (projectId: string, taskId: string, content: string) => {
    try {
      const result = await SendComments({ ProjectId: projectId, tasksID: taskId, comment: content });
      if (result.success) {

        const newComment: Comment = result.data;
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, comments: [...task.comments, newComment] }
              : task
          ),
        }));
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Erreur addComment:", err);
      return false;
    }
  },

  deleteComment: async (projectId: string, taskId: string, commentId: string) => {
    try {
      const result = await DeleteComment({ ProjectId: projectId, tasksID: taskId, idcomment: commentId });
      if (result.success) {

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, comments: task.comments.filter((c) => c.id !== commentId) }
              : task
          ),
        }));
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Erreur deleteComment:", err);
      return false;
    }
  },
}));