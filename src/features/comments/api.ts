import type { Comment } from "@/types/task";
import type { Response } from "@/types/respons";

export async function SendComments({
  ProjectId,
  tasksID,
  comment,
}: {
  ProjectId: string;
  tasksID: string;
  comment: string;
}) {
  const token = localStorage.getItem("token");
  const formData = { content: comment };
  try {
    const response = await fetch(
      `http://localhost:8000/projects/${ProjectId}/tasks/${tasksID}/comments`,
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

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "erreur",
      error: error?.message,
    };
  }
}

export async function DeleteComment({
  idcomment,
  ProjectId,
  tasksID,
}: {
  idcomment: string;
  ProjectId: string;
  tasksID: string;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8000/projects/${ProjectId}/tasks/${tasksID}/comments/${idcomment}`,
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
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "erreur",
      error: error?.message,
    };
  }
}

export async function GetTasksComment({
  ProjectId,
  tasksID,
}: {
  ProjectId: string;
  tasksID: string;
}): Promise<Response<Comment[]>> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8000/projects/${ProjectId}/tasks/${tasksID}/comments`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result: Response<Comment[]> = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false as const,
      message: "Erreur",
      error: error?.message || String(error),
    };
  }
}
