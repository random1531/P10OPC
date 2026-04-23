import type { Response } from "@/types/respons";
import type { Task } from "@/types/task";
import { toast } from "sonner";

type TasksData = { tasks: Task[] };
//Obtenir les tâches d'un projet
export async function GetDetailsTaskProject({
  id,
}: {
  id: string;
}): Promise<Response<TasksData>> {
  const token = localStorage.getItem("token");
  try {
    const reponse = await fetch(
      `${process.env.NEXT_PUBLIC_URP_API}projects/${id}/tasks`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result: Response<TasksData> = await reponse.json();
    if (!reponse.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error: any) {
    console.log(Error);
    return {
      success: false,
      message: "Erreur lors de la récupération des tâches",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

//Ajouter une tâche a un projet
export async function AddTasksToproject({
  id,
  title,
  description,
  priority,
  dueDate,
  assigneeIds,
}: {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assigneeIds: string[];
}) {
  const token = localStorage.getItem("token");
  try {
    const formData = {
      title,
      description,
      priority,
      dueDate,
      assigneeIds,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URP_API}projects/${id}/tasks`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message || "Erreur lors de l'ajout de la tâche");
    }
    return result;
  } catch (error) {
    toast.error("Erreur");
  }
}

//supprimer une tâche
export async function DeleteTask({
  idProject,
  idTask,
}: {
  idProject: string;
  idTask: string;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URP_API}projects/${idProject}/tasks/${idTask}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message || "Erreur lors de la suppression");
    }
  } catch (error) {}
}

//tâches assignées
type AssignedTask = { tasksAssigned: Task[] };

export async function AssignedTasks() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URP_API}dashboard/assigned-tasks`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result: Response<AssignedTask> = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Erreur lors de la récupération des tâches",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function ModifiedTask({
  title,
  description,
  status,
  priority,
  dueDate,
  assigneeIds,
  projectId,
  taskId,
}: {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assigneeIds: string[];
  projectId: string;
  taskId: string;
}) {
  const token = localStorage.getItem("token");
  const formData = {
    title,
    description,
    status,
    priority,
    dueDate,
    assigneeIds,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URP_API}projects/${projectId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Erreur lors de la récupération des tâches",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
