"use client"
import CardTask from "../../ui/cardTask/cardTask"
import { useProtected } from "../../context/ContextProvider"
import { GoChecklist } from "react-icons/go";
import { MdOutlineViewKanban } from "react-icons/md";
import { useState } from "react";
import DashList from "@/app/ui/liste/liste";
import DashKanban from "@/app/ui/kanban/kaban";

export default function Dashboard() {
    const { tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail } = useProtected();
    const [viewMode, setViewMode] = useState<"list" | "kanban">("list")

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <p>Tableau de bord</p>
                <p>Bonjour {userDetail?.name}, voici un aperçu de vos projets et tâches</p>
            </div>

            <div className="flex items-center">
                <div>

                    <button onClick={() => setViewMode("list")} className="flex gap-1 items-center justify-center cursor-pointe"><GoChecklist /> Liste</button>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <button onClick={() => setViewMode("kanban")} className="flex gap-1 items-center justify-center cursor-pointer">
                        <MdOutlineViewKanban />
                        Kanban</button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {loading ? (
                    <div>Chargement...</div>
                ) : viewMode === "list" ? (

                    <DashList />)
                    : viewMode === "kanban" ? (<DashKanban />) : (<div>

                    </div>)

                }

            </div>


        </div>
    )
}