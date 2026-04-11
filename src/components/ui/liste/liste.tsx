"use client";
import CardTask from "../cardTask/cardTask";
import Loader from "../tools/loader";
import { AssignedTask } from "@/types/task";

interface DashListProps {
  tasksAssigned: AssignedTask[];
  loading: boolean;
  error: string | null;
}

export default function DashList({ tasksAssigned, loading, error }: DashListProps) {
 

  return (
    <div className="flex flex-col  pr-14 pl-14 pt-10 pb-10 gap-10 rounded-xl border border-gray-200 bg-white">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-sans font-semibold text-lg text-[#1F1F1F]">
            Mes tâches assignées
          </p>
          <p className="font-sans font-normal text-base text-gray-500">
            Par ordre de priorité
          </p>
        </div>
        <input
          className="flex justify-between w-89.25 h-15.75 bg-white rounded-lg px-8 py-5.75 border border-gray-200"
          placeholder="Rechercher une tâche"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-4"></div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500 text-center py-4">
            Erreur lors du chargement des tâches: {error}
          </div>
        ) : tasksAssigned.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            Aucune tâche assignée
          </div>
        ) : (
          tasksAssigned.map((e) => (
            <CardTask
              key={e.id}
              taskname={e.title}
              description={e.description}
              projectName={e.project.name}
              duedate={new Date(e.dueDate).toDateString()}
              totalcomment={e.comments.length}
              badgeStatus={e.status}
            />
          ))
        )}
      </div>
    </div>
  );
}
