"use client"
import CardTask from "../../ui/cardTask/cardTask"
import { useProtected } from "../../context/ContextProvider"
import { GoChecklist } from "react-icons/go";
import { MdOutlineViewKanban } from "react-icons/md";
import { useState } from "react";
import DashList from "@/app/ui/liste/liste";
import DashKanban from "@/app/ui/kanban/kaban";
import HeaderDashProject from "@/app/components/headerDashProject";

export default function Dashboard() {
    const { tasks, userDetail, loading, error, refreshAssignedTasks, refreshUserDetail } = useProtected();
    const [viewMode, setViewMode] = useState<"list" | "kanban">("list")
    const [active,setActive]=useState("list")

    return (
        <div className="flex flex-col gap-9 mt-24 w-7xl pr-14 pl-14 pt-10 pb-10">
            <HeaderDashProject useName={userDetail?.name} />
            <div className="flex items-center gap-2.5">
                <div>

                    <button 
                    onClick={() => {setViewMode("list") ; setActive("list")}} 
                    className={`flex items-center gap-2.5 ${active === "list" ? ("bg-[#FFE8D9]"):("bg-white") } text-[#D3590B] rounded-lg px-4 py-[14px] font-sans font-normal text-sm cursor-pointer`}>
                        <GoChecklist /> 
                        Liste</button>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <button 
                    onClick={() => {setViewMode("kanban");setActive("kaban")}} 
                    className={`flex items-center gap-2.5 ${active === "kaban" ? ("bg-[#FFE8D9]"):("bg-white") } text-[#D3590B] rounded-lg px-4 py-[14px] font-sans font-normal text-sm cursor-pointer`}>
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