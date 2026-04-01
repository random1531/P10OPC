"use client"
import CardTaskKanban from "../cardTask/caraTaskKanban"
import { useProtected } from "../../../app/context/ContextProvider"

export default function DashKanban() {
    const { tasks } = useProtected();

    const todoTasks = tasks.filter((item) => item.status === "TODO");
    const inProgressTasks = tasks.filter((item) => item.status === "IN_PROGRESS");
    const doneTasks = tasks.filter((item) => item.status === "DONE");

    return (
        <div className="flex w-full items-start gap-10">
            <div className="border border-[#FFE0E0] flex flex-col w-[calc((100%-5rem)/3)] gap-10 bg-white px-6 pt-10 pb-10 rounded-[10px]">
                <p className="flex gap-2 w-full text-left font-sans font-semibold text-lg text-[#1F1F1F]">
                    A faire <span className="flex items-center gap-2.5 bg-gray-200 text-gray-500 rounded-full px-4 py-1 font-sans text-sm">
                        {todoTasks.length}
                        </span>
                </p>

                <div className="flex flex-col gap-6 w-full">
                    {todoTasks.map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))}
                </div>
            </div>

            <div className="border border-[#FFE0E0] flex flex-col w-[calc((100%-5rem)/3)] gap-10 bg-white px-6 pt-10 pb-10 rounded-[10px]">
                <p className="flex gap-2 w-full text-left font-sans font-semibold text-lg text-[#1F1F1F]">
                    En cours <span className="flex items-center gap-2.5 bg-gray-200 text-gray-500 rounded-full px-4 py-1 font-sans text-sm">
                        {inProgressTasks.length}
                        </span>
                </p>

                <div className="flex flex-col gap-6 w-full">
                    {inProgressTasks.map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))}
                </div>
            </div>

            <div className=" border border-[#FFE0E0]flex flex-col w-[calc((100%-5rem)/3)] gap-10 bg-white px-6 pt-10 pb-10 rounded-[10px]">
                <p className="flex gap-2 w-full text-left font-sans font-semibold text-lg text-[#1F1F1F]">
                    Terminées <span className="flex items-center gap-2.5 bg-gray-200 text-gray-500 rounded-full px-4 py-1 font-sans text-sm">
                        {doneTasks.length}
                        </span>
                </p>

                <div className="flex flex-col gap-6 w-full">
                    {doneTasks.map((e) => (
                        <CardTaskKanban
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}