

// Types pour la réponse
export type TaskProjectAssignee = {
    id: string;
    assignedAt: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
};

export type TaskProjectComment = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        email: string;
        name: string;
    };
};

export type TaskProject = {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    creatorId: string;
    creator: {
        id: string;
        email: string;
        name: string;
    };
    project: {
        id: string;
        name: string;
    };
    assignees: TaskProjectAssignee[];
    comments: TaskProjectComment[];
};

export type GetDetailsTaskProjectResponse = {
    success: boolean;
    message: string;
    data: {
        tasks: TaskProject[];
    };
};
//Détail task by project
export async function GetDetailsTaskProject({ id }: { id: string }): Promise<GetDetailsTaskProjectResponse | undefined> {
    const token = localStorage.getItem("token");
    try {
        const reponse = await fetch(`http://localhost:8000/projects/${id}/tasks`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result: GetDetailsTaskProjectResponse = await reponse.json();
        if (!reponse.ok) {
            throw new Error(result.message);
        }
        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

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

export async function searchUser({ value }: { value: string }) {
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:8000/users/search?query=${value}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const result = await response.json()
        return result
    } catch (error) {

    }
}

export async function SendComments({ProjectId,tasksID,comment}:{ProjectId:string,tasksID:string,comment:string}){
const token = localStorage.getItem("token")
const formData = { content: comment }
try {
        const response = await fetch(`http://localhost:8000/projects/${ProjectId}/tasks/${tasksID}/comments`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },body:JSON.stringify(formData)
        })
        const result = await response.json()
        return result
    } catch (error) {

    }
}