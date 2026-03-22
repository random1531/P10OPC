"use client"
import CardTaskKanban from "../cardTask/caraTaskKanban"
import { useProtected } from "../../context/ContextProvider"

export default function DashKanban() {
    const { tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail } = useProtected();

    return (
        <div className="flex gap-5">
            <div className="flex flex-col w-1/3 justify-start gap-10 items-center bg-white pr-6 pb-6 pt-10 pb-10">
            <p className="w-full text-left">A faire {tasks.filter((item) => item.status === "TODO").length}</p>
                <div className="flex flex-col gap-6">
                    {tasks.filter((item) => item.status === "TODO").map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))
                    }
                </div>
            </div>
            <div className="flex flex-col w-1/3 gap-10 justify-center items-center bg-white pr-6 pb-6 pt-10 pb-10">
            <p className="w-full text-left">En cours {tasks.filter((item) => item.status === "IN_PROGRESS").length}</p>
                <div className="flex flex-col gap-6">
                    {tasks.filter((item) => item.status === "IN_PROGRESS").map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))
                    }
                </div>
            </div>
            <div className="flex flex-col w-1/3 gap-10 justify-start items-center bg-white pr-6 pb-6 pt-10 pb-10">
            <p className="w-full text-left">Terminer {tasks.filter((item) => item.status === "DONE").length}</p>
                <div className="flex flex-col gap-6">
                    {tasks.filter((item) => item.status === "DONE").map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}