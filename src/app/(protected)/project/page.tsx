"use client"
import { useEffect, useState } from "react";
import { useProtected } from "../../context/ContextProvider"
import { GetDetailsTaskProject } from "../function"



export default function Project() {
    const { projects, tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail, refreshProjects } = useProtected();
    const [taskProject, setTaskProject] = useState<{ [key: string]: any[] }>({})
    const userOwn = userDetail?.name

    useEffect(() => {
        projects.forEach((project) => {
            GetDetailsTaskProject({ id: project.id }).then((result) => {
                setTaskProject((prev) => ({
                    ...prev,
                    [project.id]: result?.data.tasks || []
                }))
            })
        })
    }, [projects])
    return (
        <div className="grid grid-cols-3 gap-12 flex-wrap">{projects.map((e) => (
            <div className="flex flex-col bg-white rounded-xl pt-7 pb-7 pr-8 pl-8 border-1 gap-14" key={e.id}>
                <div className="flex flex-col">
                    <p>{e.name}</p>
                    <p>{e.description}</p>
                </div>
                <div className="flex flex-col">
                    <progress
                        className="h-2 w-full rounded-2xl bg-gray-200"
                        value={
                            ((taskProject[e.id] || []).filter((e) => e.status === "DONE").length * 100) /
                            ((taskProject[e.id] || []).length || 1)
                        }
                        max={100}

                    />
                    <div>
                        {(taskProject[e.id] || []).filter((e) => e.status === "DONE").length}/
                        {(taskProject[e.id] || []).length}
                    </div>
                </div>


                <div>Equipe ({e.members.length + 1})</div>
                <div className="flex gap-2">
                    <p className="text-black text-xs h-7 w-7 rounded-full bg-orange-300 flex items-center justify-center">{e.owner.name.substring(0, 2).toUpperCase()}</p>
                    <div className="bg-orange-300 rounded-2xl p-1 flex items-center justify-center">Propriétaire</div>

                    <div className="flex">
                        {e.members.filter((m) => m.user.name !== userOwn).map((m) => (
                            <p className="text-black text-xs h-7 w-7 rounded-full bg-amber-300 flex items-center justify-center" key={m.id}>
                                {m.user.name.substring(0, 2).toUpperCase()}
                            </p>
                        ))}
                    </div>
                </div>


            </div>
        ))}</div>
    )
}