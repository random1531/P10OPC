"use client"
import { useEffect, useState } from "react"
import { useProtected } from "../../../context/ContextProvider"
import { useParams } from "next/navigation";
import ModalCreateTask from "@/components/ui/modal/CreatTask";
import FormCreteTask from "./createTasks"
import type { Task } from "@/types/task"
import type { Project } from "../../../../types/project"
import Test from "../../../../components/ui/test"
import { useProjectTasksStore } from "../../../../store/useProjectTasksStore"
import HeaderProject from "@/components/ui/projectDetail/headerProject";
import HeroHeader from "@/components/ui/projectDetail/herohead";
import TasksCardProject from "@/components/ui/project/tasksCardProject";

export default function projetIdDetails() {
    const { tasks, loading, error, fetchTasks, addComment } = useProjectTasksStore();
    const { projects, userDetail, refreshProjects } = useProtected();

    const [task, setTask] = useState<Task[]>([]);
    const [pr, setpr] = useState<Project | undefined>(undefined);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [isOpen, setIsOpen] = useState<string | null>(null)
    const [opCreateTask, setopCreateTask] = useState<string | null>(null)
    const [iaTask, setIATask] = useState<string | null>(null)

    const [idp, setIdp] = useState<string>("")
    const params = useParams();
    const slug = params.slug;
    const projectId = Array.isArray(slug) ? slug[0] : slug;

    useEffect(() => {
        if (typeof projectId === "string" && projectId.length > 0) {
            fetchTasks(projectId);
            setIdp(projectId);
        }
    }, [projectId, fetchTasks]);

    useEffect(() => {
        if (typeof projectId === "string") {
            setpr(projects.find((e) => e.id === projectId));
        }
    }, [projectId, projects]);


    useEffect(() => {
        setAllTasks(tasks);
        setTask(tasks);
    }, [tasks]);

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
        if (value === null) {
            setTask(allTasks);
        } else {
            setTask(allTasks.filter((t) => t.title.toLowerCase().includes(value.toLowerCase())));
        }
    }
    return (
        <div className="flex flex-col items-center w-full relative pt-6 pb-8 px-4 sm:px-6 md:px-8 lg:px-14 gap-6">
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

            <div className="flex flex-col w-full gap-4 bg-white py-5 px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl">
                <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">Tâches</p>
                        <p className="text-sm text-gray-500">Par ordre de priorité</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <select
                            onChange={handleChange}
                            className="border rounded-lg px-3 py-2 w-full sm:w-44"
                        >
                            <option value="">Tous les statuts</option>
                            <option value="TODO">A faire</option>
                            <option value="DONE">Terminer</option>
                            <option value="IN_PROGRESS">En cours</option>
                        </select>

                        <input
                            type="search"
                            onChange={handleSearch}
                            placeholder="Rechercher une tâche"
                            className="border rounded-lg px-3 py-2 w-full sm:w-56"
                        />
                    </div>
                </div>
                {task.map((e) => (
                    <TasksCardProject
                        key={e.id}
                        task={e}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        projectId={idp}
                        ownerId={pr?.owner.id}
                    />
                ))}
            </div>
        </div >
    );
}