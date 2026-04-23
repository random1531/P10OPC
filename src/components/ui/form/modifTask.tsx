import { useEffect, useState } from "react";
import InputFunction from "./input";
import type { Task } from "@/types/task";
import type { ProjectMember } from "@/types/user";
import Status from "../select/status";
import UserAddToTasks from "../userShearch/userAddToTask/userAddToTasks";
import Button from "../button/button";
import { useProjectTasksStore } from "@/store/useProjectTasksStore";

export default function ModifTask({
  task,
  members,
}: {
  task?: Task | null;
  members?: ProjectMember[];
}) {
  const { ModifiedTask } = useProjectTasksStore();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  const PriorityBadge = [
    {
      status: "LOW",
      color: "red",
      textremplacement: "Basse",
      bgColor: "#FFE0E0",
    },
    {
      status: "MEDIUM",
      color: "orange",
      textremplacement: "Normal",
      bgColor: "#FFF0D7",
    },
    {
      status: "HIGH",
      color: "green",
      textremplacement: "Haute",
      bgColor: "#F1FFF7",
    },
  ];

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setPriority(task.priority || "");
      setStatus(task.status || "");
      setAssigneeIds(task.assignees?.map((a) => a.user.id) || []);
    }
    if (members) {
      setMemberIds(members.map((m) => m.user.id));
    }
  }, [task, members]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dueDateISO = date ? new Date(date).toISOString() : "";
    ModifiedTask(
      title,
      description,
      status,
      priority,
      dueDateISO,
      assigneeIds,
      task?.projectId ?? "",
      task?.id ?? "",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold mb-6">Modifier</h2>

      <InputFunction
        onchange={(e) => setTitle(e.target.value)}
        valueInput={title}
        labelText="Titre"
        type="text"
        idvalue="title"
      />

      <InputFunction
        onchange={(e) => setDescription(e.target.value)}
        valueInput={description}
        labelText="Description"
        type="text"
        idvalue="description"
      />

      <InputFunction
        onchange={(e) => setDate(e.target.value)}
        valueInput={date}
        labelText="Échéance"
        type="date"
        idvalue="date"
      />

      <label className="block text-sm font-medium mb-2">Assigné à :</label>
      <UserAddToTasks
        userMap={members}
        onSelectionChange={setAssigneeIds}
        initialSelectedIds={assigneeIds}
      />

      <label className="block text-sm font-medium mb-2">Statut :</label>
      <Status value={status} onChange={(e) => setStatus(e)} />

      <label className="block text-sm font-medium mb-2">Priorité :</label>
      <div className="flex gap-2 mt-2">
        {PriorityBadge.map((p) => {
          const selected = p.status === priority;
          return (
            <button
              key={p.status}
              type="button"
              onClick={() => setPriority(p.status)}
              className={`px-3 py-1 rounded-md border transition ${selected ? "border-black" : "border-transparent hover:bg-gray-50"}`}
              style={{ backgroundColor: p.bgColor, color: p.color }}
            >
              {p.textremplacement}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-4 rounded-lg bg-black text-white text-lg font-medium disabled:opacity-50"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
