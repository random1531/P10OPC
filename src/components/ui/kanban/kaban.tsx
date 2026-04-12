"use client";
import CardTaskKanban from "../cardTask/caraTaskKanban";
import { AssignedTask, Task } from "@/types/task";

interface DashKanbanProps {
  tasksAssigned: AssignedTask[];
  loading: boolean;
  error: string | null;
}

export default function DashKanban({ tasksAssigned, loading, error }: DashKanbanProps) {
  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Erreur lors du chargement des tâches: {error}
      </div>
    );
  }

  const todoTasks = tasksAssigned.filter((item) => item.status === "TODO");
  const inProgressTasks = tasksAssigned.filter((item) => item.status === "IN_PROGRESS");
  const doneTasks = tasksAssigned.filter((item) => item.status === "DONE");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <section className="border border-[#FFE0E0] flex flex-col w-full gap-6 bg-white px-4 md:px-6 pt-6 md:pt-10 pb-6 md:pb-10 rounded-[10px]">
        <div className="flex items-center justify-between">
          <p className="text-left font-sans font-semibold text-base md:text-lg text-[#1F1F1F]">
            A faire
          </p>
          <span className="flex items-center gap-2 bg-gray-200 text-gray-500 rounded-full px-3 py-1 text-sm">
            {todoTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {todoTasks.map((e) => (
            <CardTaskKanban
              key={e.id}
              taskname={e.title}
              description={e.description}
              projectName={e.project?.name ?? e.projectId}
              duedate={new Date(e.dueDate).toDateString()}
              totalcomment={e.comments.length}
              badgeStatus={e.status}
            />
          ))}
        </div>
      </section>

      <section className="border border-[#FFE0E0] flex flex-col w-full gap-6 bg-white px-4 md:px-6 pt-6 md:pt-10 pb-6 md:pb-10 rounded-[10px]">
        <div className="flex items-center justify-between">
          <p className="text-left font-sans font-semibold text-base md:text-lg text-[#1F1F1F]">
            En cours
          </p>
          <span className="flex items-center gap-2 bg-gray-200 text-gray-500 rounded-full px-3 py-1 text-sm">
            {inProgressTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {inProgressTasks.map((e) => (
            <CardTaskKanban
              key={e.id}
              taskname={e.title}
              description={e.description}
              projectName={e.project?.name ?? e.projectId}
              duedate={new Date(e.dueDate).toDateString()}
              totalcomment={e.comments.length}
              badgeStatus={e.status}
            />
          ))}
        </div>
      </section>

      <section className="border border-[#FFE0E0] flex flex-col w-full gap-6 bg-white px-4 md:px-6 pt-6 md:pt-10 pb-6 md:pb-10 rounded-[10px]">
        <div className="flex items-center justify-between">
          <p className="text-left font-sans font-semibold text-base md:text-lg text-[#1F1F1F]">
            Terminées
          </p>
          <span className="flex items-center gap-2 bg-gray-200 text-gray-500 rounded-full px-3 py-1 text-sm">
            {doneTasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {doneTasks.map((e) => (
            <CardTaskKanban
              key={e.id}
              taskname={e.title}
              description={e.description}
              projectName={e.project?.name ?? e.projectId}
              duedate={new Date(e.dueDate).toDateString()}
              totalcomment={e.comments.length}
              badgeStatus={e.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
