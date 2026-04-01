"use client"
import CardTask from "../cardTask/cardTask"
import { useProtected } from "../../../app/context/ContextProvider"


export default function DashList() {
    const { tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail } = useProtected();
    return (
        <div className="flex flex-col  pr-14 pl-14 pt-10 pb-10 gap-10 rounded-xl border border-gray-200 bg-white">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="font-sans font-semibold text-lg text-[#1F1F1F]">Mes tâches assignées</p>
                    <p className="font-sans font-normal text-base text-gray-500">Par ordre de priorité</p>
                </div>
                <input className="flex justify-between w-[357px] h-[63px] bg-white rounded-lg px-8 py-[23px] border border-gray-200" placeholder="Rechercher une tâche" type="text" />
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