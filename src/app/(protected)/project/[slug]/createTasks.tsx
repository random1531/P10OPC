import { useState, useEffect } from "react"
import { AddTasksToproject } from "../../function"
import { useParams } from "next/navigation";
import Inputseach from "../../../ui/userShearch/usershearch"


export default function createTasks() {
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



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const result = await AddTasksToproject({ id, title, description, dueDate, priority, assigneeIds });
        if (result && result.success) {
            setMessage(result.message)
        } else if (result && result.data && Array.isArray(result.data.errors)) {
           
            setMessage(result.data.errors.map((err: any) => err.message).join(" | "));
        } else if (result && result.message) {
            setMessage(result.message);
        } else {
            setMessage("Une erreur est survenue lors de la création de la tâche.");
        }
    };

    return (
        <div className="flex flex-col gap-10">
            <h2>Créer une tâche</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6" action="">

                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="title">Titre</label>
                    <input onChange={(e) => setTitle(e.target.value)} id="title" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} id="description" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm" htmlFor="dueDate">Date</label>
                    <input onChange={(e) => setDueDate(new Date(e.target.value).toISOString())} id="dueDate" className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border-1 border-gray-400 bg-white" type="date" />
                </div>
                
                  <Inputseach userSelected={assigneeIds} setUserSelected={setAssigneeIds} />
                {message}
                <button type="submit">Crée</button>
            </form>
        </div>
    )
}