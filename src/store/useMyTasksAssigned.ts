import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AssignedTasks } from "@/features/task/api";
import { AssignedTask, Task } from "@/types/task";

type TasksAssignedState = {
  tasksAssigned: AssignedTask[];
  loading: boolean;
  error: string | null;
  fetchAssignedTasks: () => Promise<void>;
};

export const useMyTasksAssigned = create<TasksAssignedState>()(
  devtools(
    (set, get) => ({
      tasksAssigned: [],
      loading: false,
      error: null,

      fetchAssignedTasks: async () => {
        if (get().loading) return;

        set({ loading: true, error: null });
        try {
          const result = await AssignedTasks();
          if (result.success) {
            const data = (result as any).data;
            const tasksAssigned = Array.isArray(data?.tasks)
              ? data.tasks
              : [];
            set({ tasksAssigned, loading: false });
          } else {
            set({
              tasksAssigned: [],
              loading: false,
              error:
                result.message ||
                "Erreur lors du chargement des tâches assignées",
            });
          }
        } catch (err: any) {
          set({
            loading: false,
            error:
              err.message || "Erreur lors du chargement des tâches assignées",
          });
        }
      },
    }),
    { name: "my-tasks-assigned-store" },
  ),
);
