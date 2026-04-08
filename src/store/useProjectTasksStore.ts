import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetDetailsTaskProject } from "../features/task/api";
import {
  GetTasksComment,
  SendComments,
  DeleteComment,
} from "@/features/comments/api";
import { AddTasksToproject, DeleteTask } from "../features/task/api";
import type { Task, Comment } from "@/types/task";
import { toast } from "sonner";

type ProjectTasksState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (projectId: string) => Promise<void>;
  addTasks: (
    id: string,
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    assigneeIds: string[],
  ) => Promise<void>;
  deleteTask: (idProject: string, idTask: string) => Promise<boolean>;
  refreshComments: (projectId: string, taskId: string) => Promise<void>;
  addComment: (
    projectId: string,
    taskId: string,
    content: string,
  ) => Promise<boolean>;
  deleteComment: (
    projectId: string,
    taskId: string,
    commentId: string,
  ) => Promise<boolean>;
};

export const useProjectTasksStore = create<ProjectTasksState>()(
  devtools(
    (set, get) => ({
      tasks: [],
      loading: false,
      error: null,

      fetchTasks: async (projectId: string) => {
        if (get().loading) return;
        set({ loading: true, error: null });
        try {
          const result = await GetDetailsTaskProject({ id: projectId });
          if (result.success) {
            const tasks = Array.isArray(result.data.tasks)
              ? result.data.tasks
              : [];
            set({ tasks, loading: false });
          } else {
            set({ tasks: [], loading: false, error: result.message });
          }
        } catch (err: any) {
          set({
            loading: false,
            error: err.message || "Erreur lors du chargement des tâches",
          });
        }
      },
      deleteTask: async (idProject: string, idTask: string) => {
        set({ loading: true, error: null });

        try {
          await DeleteTask({ idProject, idTask });
          set({ loading: false });
          toast.success("Tâche supprimée avec succès");

          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== idTask),
          }));
          return true;
        } catch (err: any) {}
      },
      addTasks: async (
        id: string,
        title: string,
        description: string,
        priority: string,
        dueDate: string,
        assigneeIds: string[],
      ) => {
        set({ loading: true, error: null });
        try {
          const result = await AddTasksToproject({
            id,
            title,
            description,
            priority,
            dueDate,
            assigneeIds,
          });
          if (result?.success) {
            const createdTask = result.data?.task;
            if (createdTask) {
              set((state) => ({
                tasks: [...state.tasks, createdTask],
                loading: false,
              }));
            } else {
              const details = await GetDetailsTaskProject({ id });
              if (details.success) {
                const tasks = Array.isArray(details.data.tasks)
                  ? details.data.tasks
                  : [];
                set({ tasks, loading: false });
              } else {
                set({ loading: false });
              }
            }
            toast.success("Tâche créée avec succès");
          } else {
            set({ loading: false, error: result?.message });
            toast.error(
              result?.message || "Erreur lors de la création de la tâche",
            );
          }
        } catch (error: any) {
          set({
            loading: false,
            error: error?.message || "Erreur lors de l'ajout de la tâche",
          });
          toast.error(error?.message || "Erreur lors de l'ajout de la tâche");
        }
      },

      refreshComments: async (projectId: string, taskId: string) => {
        try {
          const result = await GetTasksComment({
            ProjectId: projectId,
            tasksID: taskId,
          });
          if (result.success) {
            const comments = Array.isArray(result.data) ? result.data : [];

            set((state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, comments } : task,
              ),
            }));
          }
        } catch (err: any) {}
      },

      addComment: async (
        projectId: string,
        taskId: string,
        content: string,
      ) => {
        try {
          const result = await SendComments({
            ProjectId: projectId,
            tasksID: taskId,
            comment: content,
          });
          if (result.success) {
            toast.success(result.message);
            const newComment: Comment = result.data.comment;
            set((state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, comments: [...task.comments, newComment] }
                  : task,
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

      deleteComment: async (
        projectId: string,
        taskId: string,
        commentId: string,
      ) => {
        try {
          const result = await DeleteComment({
            ProjectId: projectId,
            tasksID: taskId,
            idcomment: commentId,
          });
          if (result.success) {
            toast.success(result.message);
            set((state) => ({
              tasks: state.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      comments: task.comments.filter((c) => c.id !== commentId),
                    }
                  : task,
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
    }),
    { name: "ProjectTasksStore" },
  ),
);
