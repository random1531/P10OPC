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
import FormCreteTask from "./createTasks"
import { DeleteTask } from "../../function"

export default function projetIdDetails() {
    const [task, setTask] = useState<TaskProject[]>([]);
    const [allTasks, setAllTasks] = useState<TaskProject[]>([]);
    const [isOpen, setIsOpen] = useState<string | null>(null)
    const [opCreateTask, setopCreateTask] = useState<string | null>(null)
    const params = useParams();
    const slug = params.slug;
    const projectId = Array.isArray(slug) ? slug[0] : slug;
    console.log(isOpen)
    useEffect(() => {
        if (typeof projectId === "string" && projectId.length > 0) {
            GetDetailsTaskProject({ id: projectId }).then((result) => {
                setAllTasks(result?.data?.tasks ?? []);
                setTask(result?.data?.tasks ?? []);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [projectId]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "") {
            setTask(allTasks);
        } else {
            setTask(allTasks.filter((t) => t.status === value));
        }
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setTask(allTasks);
        } else {
            setTask(allTasks.filter((t) => t.title.toLowerCase().includes(value.toLowerCase())));
        }
    }
    return (
        <div className="flex flex-col items-center w-full relative pt-10 pb-10 pr-14 pl-14">
            <div className="flex justify-between bg-gray-100 h-16 w-full rounded-xl pt-5 pb-5 pr-12 pl-12">
                <div className="flex items-center"><p>Contributeurs </p> <span> 3 personnes</span></div>
                <div></div>
            </div>

            {opCreateTask && <ModalCreateTask onClose={() => setopCreateTask(null)} children={<FormCreteTask />} />}
            <div>
                <button onClick={() => setopCreateTask("open")} className="bg-black text-white">Crée tache</button>
            </div>
            <div className="flex flex-col w-full gap-2.5 bg-white pt-5 pb-5 pr-12 pl-12">
                <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                        <p>Tâches</p>
                        <p>Par ordre de priorité</p>
                    </div>
                    <div>

                        <select onChange={handleChange} name="" id="">
                            <option value=""></option>
                            <option value="TODO">A faire</option>
                            <option value="DONE">Terminer</option>
                            <option value="IN_PROGRESS">En cours</option>
                        </select>
                        <input type="search" onChange={handleSearch} className="border-1" name="" id="" />
                    </div>
                </div>
                {task.map((e) => (
                    <div key={e.id} className="flex flex-col w-full gap-6 bg-white rounded-xl border-gray-100 border-2 pt-6 pb-6 pr-10 pl-10">
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex justify-between">

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            if (typeof projectId === "string") {
                                                DeleteTask({ idProject: projectId, idTask: e.id });
                                            }
                                        }}

                                    >Delete</button>
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

                        {isOpen === e.id && <div className="flex flex-col gap-14">{e.comments.map((e) => (
                            <div className="flex flex-col" key={e.id}>
                                <div className="flex justify-between h-20">
                                    <p>{e.author.name.substring(0, 2)}</p>
                                    <div className="flex flex-col justify-between bg-gray-100 h-20 w-11/12 rounded-xl p-4">
                                        <p>{e.author.name}</p>
                                        <p >{e.content}</p> </div>
                                </div>
                            </div>
                        ))}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}