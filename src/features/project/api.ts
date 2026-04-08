import type { Project } from "@/types/project";
import type { Response } from "@/types/respons";
import { error } from "console";

export async function CreateProject({
  Title,
  description,
  userIds,
}: {
  Title: string;
  description: string;
  userIds: string[];
}): Promise<Response<Project>> {
  const token = localStorage.getItem("token");
  const formData = {
    name: Title,
    description: description,
    contributors: userIds,
  };
  try {
    const response = await fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result: Response<Project> = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false as const,
      message: "Erreur lors de la création du projet",
      error: error?.message || String(error),
    };
  }
}

export async function GetProject(): Promise<Response<{ projects: Project[] }>> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:8000/projects", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result: Response<{ projects: Project[] }> = await response.json();

    return result;
  } catch (error: any) {
    return {
      success: false as const,
      message: "Erreur",
      error: error?.message || String(error),
    };
  }
}

export async function DeleteProject({ id }: { id: string }) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function GetSoloPorject({ id }: { id: string }) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result: Response<{ project: Project }> = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "erreur",
      error: error?.message,
    };
  }
}

export async function UpdateProject({
  id,
  Title,
  description,
}: {
  id: string;
  Title?: string;
  description?: string;
}) {
  const token = localStorage.getItem("token");
  const formData = { name: Title, description: description };
  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result: Response<{ project: Project }> = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "erreur",
      error: error?.message,
    };
  }
}
