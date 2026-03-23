"use client"
import { useEffect, useState } from "react"
import { GetDetailsTaskProject, TaskProject } from "../../function"
import { FaChevronUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { useParams } from "next/navigation";
import Badge from "@/app/ui/badge/badge";
import ModalCreateTask from "@/app/ui/modal/CreatTask";
import FormModal from '../../../ui/modal/form'

export default function projetIdDetails() {
    const [task, setTask] = useState<TaskProject[]>([]);
    const [isOpen, setIsOpen] = useState<string | null>(null)
    const [opCreateTask, setopCreateTask] = useState<string | null>(null)
    const params = useParams();
    const slug = params.slug;
    const projectId = Array.isArray(slug) ? slug[0] : slug;
    console.log(isOpen)
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
        <div className="flex flex-col items-center w-full relative">
            {opCreateTask && <ModalCreateTask onClose={()=>setopCreateTask(null)} children={<FormModal/>}/>}
            <div>
                <button onClick={() => setopCreateTask("open")} className="bg-black text-white">Crée tache</button>
            </div>
            <div className="flex flex-col w-5/6 gap-2.5">
                {task.map((e) => (
                    <div key={e.id} className="flex flex-col w-full gap-6 bg-white rounded-xl border-gray-100 border-2 pt-6 pb-6 pr-10 pl-10">
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex justify-between">

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <p className="text-lg font-semibold">{e.title}</p>
                                        <Badge status={e.status} />
                                    </div>
                                    <p className="text-sm font-normal text-gray-600">{e.description}</p>
                                </div>
                                <div className="cursor-pointer flex items-center justify-center h-14 w-14 border-gray-200 border-1 rounded-xl text-xs">

                                    <BsThreeDots className="" />
                                </div>
                            </div>
                            <p className="flex w-full items-center ">Echéance:  <CiCalendarDate /> {new Date(e.dueDate).getDate()} {new Date(e.dueDate).toLocaleString("fr-FR", { month: "long" })}</p>
                            <div>
                                <p>Assigné a : </p><div className="flex gap-2.5">{e.assignees.map((e) => (<p key={e.id}>{e.user.name.substring(0, 2).toUpperCase()} {e.user.name}</p>))}</div>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <p >Commentaire ({e.comments.length})</p>
                                <FaChevronUp
                                    onClick={() => setIsOpen(isOpen === e.id ? null : e.id)}
                                    className={`cursor-pointer transition-transform duration-200 ${isOpen === e.id ? "rotate-180" : ""}`}
                                />
                            </div>
                        </div>

                        {isOpen === e.id && <div>{e.comments.map((e) => (
                            <div key={e.id}> <p >{e.content}</p> <p>{e.author.name}</p></div>
                        ))}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}