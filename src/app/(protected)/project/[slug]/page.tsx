"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModalCreateTask from "@/components/ui/modal/ModalProps";
import FormCreteTask from "./createTasks";
import type { Task } from "@/types/task";
import type { Project } from "../../../../types/project";
import Test from "../../../../components/ui/test";
import { useProjectTasksStore } from "../../../../store/useProjectTasksStore";
import HeaderProject from "@/components/ui/projectDetail/headerProject";
import HeroHeader from "@/components/ui/projectDetail/herohead";
import TasksCardProject from "@/components/ui/project/tasksCardProject";
import ProjetModif from "@/components/ui/form/projectModif";
import { useProjectStore } from "@/store/useProjectStore";

export default function ProjetIdDetails() {
  const { tasks, loading, error, fetchTasks, addComment } =
    useProjectTasksStore();
  const { projects, fetchProjects } = useProjectStore();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined,
  );
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isIATaskOpen, setIsIATaskOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const params = useParams();
  const slug = params.slug;
  const projectId = Array.isArray(slug) ? slug[0] : (slug ?? "");

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId);
    }
  }, [projectId, fetchTasks]);

  useEffect(() => {
    if (projectId) {
      setCurrentProject(projects.find((p) => p.id === projectId));
    }
  }, [projectId, projects]);

  useEffect(() => {
    setAllTasks(tasks);
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    if (status === "") {
      setFilteredTasks(allTasks);
    } else {
      setFilteredTasks(allTasks.filter((t) => t.status === status));
    }
  };

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredTasks(allTasks);
    } else {
      setFilteredTasks(
        allTasks.filter((t) => t.title.toLowerCase().includes(searchTerm)),
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative pt-6 pb-8 px-4 sm:px-6 md:px-8 lg:px-14 gap-6">
      <HeroHeader
        OpenModifProject={() => setIsProjectOpen(true)}
        ProjectDescription={currentProject?.description}
        ProjectName={currentProject?.name}
        onCreateTask={() => setIsCreateTaskOpen(true)}
        onCreateIATask={() => setIsIATaskOpen(true)}
      />
      <HeaderProject
        contributornb={((currentProject?.members?.length ?? 0) + 1).toString()}
        owner={currentProject?.owner}
        members={currentProject?.members}
      />

      {isIATaskOpen && (
        <ModalCreateTask onClose={() => setIsIATaskOpen(false)}>
          <Test idPorject={projectId} />
        </ModalCreateTask>
      )}
      {isCreateTaskOpen && (
        <ModalCreateTask onClose={() => setIsCreateTaskOpen(false)}>
          <FormCreteTask />
        </ModalCreateTask>
      )}
      {isProjectOpen && (
        <ModalCreateTask onClose={() => setIsProjectOpen(false)}>
          <ProjetModif ids={projectId} />
        </ModalCreateTask>
      )}

      <div className="flex flex-col w-full gap-4 bg-white py-5 px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl">
        <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Tâches</p>
            <p className="text-sm text-gray-500">Par ordre de priorité</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              onChange={handleStatusFilter}
              className="border rounded-lg px-3 py-2 w-full sm:w-44"
            >
              <option value="">Tous les statuts</option>
              <option value="TODO">A faire</option>
              <option value="DONE">Terminé</option>
              <option value="IN_PROGRESS">En cours</option>
            </select>

            <input
              type="search"
              onChange={handleSearchFilter}
              placeholder="Rechercher une tâche"
              className="border rounded-lg px-3 py-2 w-full sm:w-56"
            />
          </div>
        </div>

        {filteredTasks.map((task) => (
          <TasksCardProject
            key={task.id}
            task={task}
            isOpen={openCommentId}
            setIsOpen={setOpenCommentId}
            projectId={projectId}
            ownerId={currentProject?.owner.id}
          />
        ))}
      </div>
    </div>
  );
}
