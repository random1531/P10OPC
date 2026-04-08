"use client";
import { useEffect, useState } from "react";
import { useProtected } from "../../context/ContextProvider";
import { GetDetailsTaskProject } from "../../../features/task/api";
import { useRouter } from "next/navigation";
import ModalCreateTask from "../../../components/ui/modal/ModalProps";
import CreatProject from "@/components/ui/form/project";
import HeaderDashProject from "@/components/headerDashProject";
import ProjectCard from "../../../components/ui/project/projets";
import ProjectProgress from "@/components/ui/project/ProjectProgress";
import { AiOutlineTeam } from "react-icons/ai";
import { useProjectStore } from "@/store/useProjectStore";
import Loader from "@/components/ui/loader";
import type { Task } from "@/types/task";

export default function Project() {
  const { projects, loading, error, fetchProjects } = useProjectStore();
  const { userDetail } = useProtected();
  const [taskProject, setTaskProject] = useState<{ [key: string]: any[] }>({});
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const userOwn: string | undefined = userDetail?.name;
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    async function loadTasks() {
      const results = await Promise.all(
        projects.map(async (project) => {
          const result = await GetDetailsTaskProject({ id: project.id });

          return {
            projectId: project.id,
            tasks: result.success ? result.data.tasks : [],
          };
        }),
      );
      const groupedTasks = results.reduce<Record<string, Task[]>>(
        (acc, item) => {
          acc[item.projectId] = item.tasks;
          return acc;
        },
        {},
      );
      setTaskProject(groupedTasks);
    }

    if (projects.length > 0) {
      loadTasks();
    }
  }, [projects]);

  if (loading) return <Loader />;
  if (error) return <p className="p-8 text-red-500">Erreur : {error}</p>;

  return (
    <div className="flex flex-col w-full items-center gap-16 mt-6">
      {isOpen && (
        <ModalCreateTask
          onClose={() => setIsOpen(null)}
          children={<CreatProject onClose={() => setIsOpen(null)} />}
        />
      )}
      <div className="flex justify-between items-center w-4/5">
        <HeaderDashProject
          open={() => setIsOpen("open")}
          useName={userDetail?.name}
        />
      </div>

      <div className="grid grid-cols-3 gap-12 flex-wrap w-4/5">
        {projects.map((e) => (
          <button
            className="cursor-pointer flex flex-col bg-white rounded-xl pt-7 pb-7 pr-8 pl-8 border gap-14 justify-between border-gray-200"
            key={e.id}
            onClick={() => router.push(`/project/${e.id}`)}
          >
            <ProjectCard Description={e.description} Name={e.name} />
            <div className="flex flex-col gap-3.5 w-full">
              <ProjectProgress
                done={
                  (taskProject[e.id] || []).filter((t) => t.status === "DONE")
                    .length
                }
                total={(taskProject[e.id] || []).length}
              />
              <div className="flex items-center gap-1 font-normal text-[10px] text-gray-600">
                <AiOutlineTeam /> Equipe ({e.members.length + 1})
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-black text-xs h-7 w-7 rounded-full bg-[#FFE8D9] flex items-center justify-center">
                  {e.owner.name.substring(0, 2).toUpperCase()}
                </p>
                <div className="bg-[#FFE8D9] text-[#D3590B] rounded-2xl p-1 flex items-center justify-center">
                  Propriétaire
                </div>

                <div className="flex">
                  {e.members
                    .filter((m) => m.user.name !== userOwn)
                    .map((m) => (
                      <p
                        className="text-black text-xs h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center"
                        key={m.id}
                      >
                        {m.user.name.substring(0, 2).toUpperCase()}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
