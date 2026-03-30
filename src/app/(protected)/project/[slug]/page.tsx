"use client"
import { useEffect, useState } from "react"
import { GetDetailsTaskProject, TaskProject } from "../../function"
import { useProtected } from "../../../context/ContextProvider"
import { FaChevronUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { useParams } from "next/navigation";
import Badge from "@/app/ui/badge/badge";
import ModalCreateTask from "@/app/ui/modal/CreatTask";
import FormCreteTask from "./createTasks"
import { SendComments } from "../../function"
import type { Project } from "../../../types/user"
import Test from "../../../ui/test"
import { useProjectTasksStore } from "../../../store/useProjectTasksStore";
import HeaderProject from "@/app/ui/projectDetail/headerProject";
import HeroHeader from "@/app/ui/projectDetail/herohead";
export default function projetIdDetails() {
    const { tasks, loading, error, fetchTasks } = useProjectTasksStore();
    const { projects, userDetail, refreshAssignedTasks, refreshUserDetail } = useProtected();

    const [task, setTask] = useState<TaskProject[]>([]);
    const [pr, setpr] = useState<Project | undefined>(undefined);
    const [allTasks, setAllTasks] = useState<TaskProject[]>([]);
    const [isOpen, setIsOpen] = useState<string | null>(null)
    const [opCreateTask, setopCreateTask] = useState<string | null>(null)
    const [iaTask, setIATask] = useState<string | null>(null)
    const [commentss, setComments] = useState<string>("")
    const [idp, setIdp] = useState<string>("")
    const params = useParams();
    const slug = params.slug;
    const projectId = Array.isArray(slug) ? slug[0] : slug;

    useEffect(() => {
        if (typeof projectId === "string" && projectId.length > 0) {
            GetDetailsTaskProject({ id: projectId }).then((result) => {
                setAllTasks(result?.data?.tasks ?? []);
                setTask(result?.data?.tasks ?? []);
                setIdp(projectId)
                setpr(projects.find((e) => e.id === projectId));
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [projectId, projects]);

    useEffect(() => {
        if (typeof projectId === "string" && projectId.length > 0) {
            fetchTasks(projectId);

        }
    }, [projectId, fetchTasks]);

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
    console.log(pr)

    return (
        <div className="flex flex-col items-center w-full relative pt-10 pb-10 pr-14 pl-14 gap-6">
            <HeroHeader
                ProjectDescription={pr?.description}
                ProjectName={pr?.name}
                onCreateTask={() => setopCreateTask("open")}
                onCreateIATask={() => setIATask("open")}
            />
            <HeaderProject
                contributornb={((pr?.members?.length ?? 0) + 1).toString()}
                owner={pr?.owner}
                members={pr?.members}
            />
            {iaTask && <ModalCreateTask onClose={() => setIATask(null)} children={<Test idPorject={idp} />} />}
            {opCreateTask && <ModalCreateTask onClose={() => setopCreateTask(null)} children={<FormCreteTask />} />}

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
                {tasks.map((e) => (
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

                        {isOpen === e.id && <div className="flex flex-col gap-4">{e.comments.map((e) => (
                            <div className="flex flex-col" key={e.id}>
                                <div className="flex justify-between h-20">
                                    <p>{e.author.name.substring(0, 2)}</p>
                                    <div className="flex justify-between bg-gray-100 h-20 w-11/12 rounded-xl p-4">
                                        {userDetail && e.author.id === userDetail?.id ? <p>XA</p> : null}
                                        <div className="flex flex-col justify-between">

                                            <p>{e.author.name}</p>
                                            <p >{e.content}</p>
                                        </div>
                                        <p className="text-[10px] text-gray-600">{new Date(e.createdAt).toLocaleDateString("fr-FR", { dateStyle: "medium" })}, {new Date(e.createdAt).toLocaleTimeString("fr-FR", { timeStyle: "short" })}</p>
                                    </div>
                                </div>
                            </div>
                        ))} <div className="flex justify-between h-32">
                                <p>ui</p>
                                <form onSubmit={(t) => { t.preventDefault(), SendComments({ ProjectId: idp, tasksID: e.id, comment: commentss }) }} className="flex items-end flex-col gap-2.5 justify-between h-full w-11/12 rounded-xl ">

                                    <div className="flex justify-between bg-gray-100 h-20 w-full rounded-xl ">
                                        <input onChange={(e) => setComments(e.target.value)} type="text" placeholder="Ajouter un commentaire..." className="w-full h-full border-2" />
                                    </div>
                                    <button key={e.id} type="submit" className="bg-black text-white rounded-xl w-2xs h-12">Envoyer</button>
                                </form>
                            </div>

                        </div>}

                    </div>
                ))}
            </div>
        </div >
    );
}