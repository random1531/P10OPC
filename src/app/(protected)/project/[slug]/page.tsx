"use client"
import { useEffect, useState } from "react"
import { GetDetailsTaskProject, TaskProject } from "../../function"
import { useParams } from "next/navigation";
import Badge from "@/app/ui/badge/badge";

export default function projetIdDetails() {
    const [task, setTask] = useState<TaskProject[]>([]);
    const params = useParams();
    const slug = params.slug;
    const projectId = Array.isArray(slug) ? slug[0] : slug;

    useEffect(() => {
        if (typeof projectId === "string" && projectId.length > 0) {
            GetDetailsTaskProject({ id: projectId }).then((result) => {
                setTask(result?.data?.tasks ?? []);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [projectId]);

    return (
        <div className="w-full flex flex-col">
            {task.map((e) => (
                <div key={e.id} className="w-full h-64 bg-white">
                    <div className="flex gap-2">
                        <p>{e.title}</p>
                        <Badge status={e.status} />
                    </div>
                    <p>Echéance:  {new Date(e.dueDate).toLocaleDateString()}</p>
                    <div>
                        <p>Assigné a : </p><div className="flex gap-2.5">{e.assignees.map((e) => (<p key={e.id}>{e.user.name.substring(0, 2).toUpperCase()} {e.user.name}</p>))}</div>
                    </div>
                    <hr />
                    <p>Commentaire ({e.comments.length})</p>
                    <button></button>
                </div>
            ))}
        </div>
    );
}