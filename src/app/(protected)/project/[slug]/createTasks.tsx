import { useState, useEffect } from "react"
import { AddTasksToproject } from "@/features/task/api";
import { useParams } from "next/navigation";
import Inputseach from "../../../../components/ui/userShearch/usershearch"
import { useProjectTasksStore } from "@/store/useProjectTasksStore"
import { toast } from "sonner";
import { useProjectStore } from "@/store/useProjectStore";
import { Project } from "@/types/project";
import UserAddToTasks from "@/components/ui/userShearch/userAddToTask/userAddToTasks";

export default function createTasks() {
    const { fetchTasks } = useProjectTasksStore();
    const params = useParams();
    const slugParam = params.slug;
    const normalizedId = Array.isArray(slugParam) ? slugParam[0] : slugParam ?? "";
    const [id, setId] = useState<string>(normalizedId)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("")
    const [assigneeIds, setAssigneeIds] = useState<string[]>([])
    const [message, setMessage] = useState("")
    const { projects, loading, error, fetchProjects } = useProjectStore();
    const [acProject, setAcproject] = useState<Project>()

    useEffect(() => {
        fetchProjects();
        setAcproject(projects.find((e) => e.id === normalizedId))
    }, [projects, normalizedId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const result = await AddTasksToproject({ id, title, description, dueDate, priority, assigneeIds });
        if (result && result.success) {
            setMessage(result.message)
            await fetchTasks(id);
            toast.success(result.message)
        } else if (result && result.data && Array.isArray(result.data.errors)) {

            setMessage(result.data.errors.map((err: any) => err.message).join(" | "));
        } else if (result && result.message) {
            setMessage(result.message);
            toast.error(result.message);
        } else {
            setMessage("Une erreur est survenue lors de la création de la tâche.");
            toast.error(result.message);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <h2>Créer une tâche</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm" htmlFor="title">Titre</label>
                    <input onChange={(e) => setTitle(e.target.value)} id="title" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border border-gray-400 bg-white" type="text" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description">Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} id="description" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border border-gray-400 bg-white" type="text" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm" htmlFor="dueDate">Date</label>
                    <input onChange={(e) => setDueDate(new Date(e.target.value).toISOString())} id="dueDate" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border border-gray-400 bg-white" type="date" />
                </div>
                <UserAddToTasks userMap={acProject?.members} />
              
                {message}
                <button className="rounded-[10px] py-3.25 px-18.5 bg-black text-white disabled:bg-[#E5E7EB] disabled:text-[#E5E7EB]" type="submit">+ Ajouter une tâche</button>
            </form>
        </div>
    )
}