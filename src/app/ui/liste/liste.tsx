"use client"
import CardTask from "../../ui/cardTask/cardTask"
import { useProtected } from "../../context/ContextProvider"


export default function DashList() {
    const { tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail } = useProtected();
    return (
        <div className="flex flex-col w-7xl pr-14 pl-14 pt-10 pb-10 gap-10 rounded-xl border-1 bg-white">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p>Mes tâches assignées</p>
                    <p>Par ordre de priorité</p>
                </div>
                <input className="border-2" type="text" />
            </div>

            <div className="flex flex-col gap-4"></div>
            <div className="flex flex-col gap-4">
                {loading ? (
                    <div>Chargement...</div>
                ) : (
                    tasks.map((e) => (
                        <CardTask
                            key={e.id}
                            taskname={e.title}
                            description={e.description}
                            projectName={e.project.name}
                            duedate={new Date(e.dueDate).toDateString()}
                            totalcomment={e.comments.length}
                            badgeStatus={e.status}
                        />)
                    ))


                }

            </div>
        </div>
    )
}