"use client";
import { useProtected } from "../../context/ContextProvider";
import { GoChecklist } from "react-icons/go";
import { MdOutlineViewKanban } from "react-icons/md";
import { useEffect, useState } from "react";
import DashList from "@/components/ui/liste/liste";
import DashKanban from "@/components/ui/kanban/kaban";
import HeaderDashProject from "@/components/headerDashProject";
import CreatProject from "@/components/ui/form/project";
import ModalCreateTask from "@/components/ui/modal/ModalProps";
import { useProjectStore } from "@/store/useProjectStore";
import { useMyTasksAssigned } from "@/store/useMyTasksAssigned";

export default function Dashboard() {
  const { userDetail } = useProtected();
  const { 
    projects, 
    loading: projectLoading, 
    error: projectError, 
    fetchProjects 
  } = useProjectStore();
  
  const { 
    tasksAssigned, 
    loading: taskLoading, 
    error: taskError, 
    fetchAssignedTasks 
  } = useMyTasksAssigned();
  
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [active, setActive] = useState("list");
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const loading = projectLoading || taskLoading;
  const error = projectError || taskError;

  useEffect(() => {
    fetchProjects();
    fetchAssignedTasks();
  }, [fetchProjects, fetchAssignedTasks]);

  return (
    <div className="flex flex-col gap-9 mt-24 w-7xl pr-14 pl-14 pt-10 pb-10">
      <HeaderDashProject
        open={() => setIsOpen("open")}
        useName={userDetail?.name}
      />
      {isOpen && (
        <ModalCreateTask
          onClose={() => setIsOpen(null)}
          children={<CreatProject onClose={() => setIsOpen(null)} />}
        />
      )}
      <div className="flex items-center gap-2.5">
        <div>
          <button
            onClick={() => {
              setViewMode("list");
              setActive("list");
            }}
            className={`flex items-center gap-2.5 ${active === "list" ? "bg-[#FFE8D9]" : "bg-white"} text-[#D3590B] rounded-lg px-4 py-3.5 font-sans font-normal text-sm cursor-pointer`}
          >
            <GoChecklist />
            Liste
          </button>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <button
            onClick={() => {
              setViewMode("kanban");
              setActive("kaban");
            }}
            className={`flex items-center gap-2.5 ${active === "kaban" ? "bg-[#FFE8D9]" : "bg-white"} text-[#D3590B] rounded-lg px-4 py-3.5 font-sans font-normal text-sm cursor-pointer`}
          >
            <MdOutlineViewKanban />
            Kanban
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div>Chargement...</div>
        ) : viewMode === "list" ? (
          <DashList tasksAssigned={tasksAssigned} loading={taskLoading} error={taskError} />
        ) : viewMode === "kanban" ? (
          <DashKanban tasksAssigned={tasksAssigned} loading={taskLoading} error={taskError} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
