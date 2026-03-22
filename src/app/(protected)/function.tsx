

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