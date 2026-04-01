import type { Response} from "@/types/respons";
import type { Task } from "@/types/task";


//Obtenir les tâches d'un projet
export async function GetDetailsTaskProject({ id }: { id: string }): Promise<Response<Task[]> |undefined> {
    const token = localStorage.getItem("token");
    try {
        const reponse = await fetch(`http://localhost:8000/projects/${id}/tasks`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result: Response<Task[]> = await reponse.json();
        if (!reponse.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

//Ajouter une tâche a un projet
export async function AddTasksToproject(
    { id, title, description, priority, dueDate, assigneeIds }:
        { id: string, title: string, description: string, priority: string, dueDate: string, assigneeIds: string[] }) {
    const token = localStorage.getItem("token")
    try {
        const formData = {
            title, description, priority, dueDate, assigneeIds
        }
        const response = await fetch(`http://localhost:8000/projects/${id}/tasks`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)

        })
        const result = await response.json()
        return result
    } catch (error) {

    }
}

//supprimer une tâche
export async function DeleteTask({ idProject, idTask }: { idProject: string, idTask: string }) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8000/projects/${idProject}/tasks/${idTask}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const result = await response.json()
        alert("Tache supprimé")
    } catch (error) {

    }
}