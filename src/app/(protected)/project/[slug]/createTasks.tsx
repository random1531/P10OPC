import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProjectTasksStore } from "@/store/useProjectTasksStore";
import { useProjectStore } from "@/store/useProjectStore";
import { Project } from "@/types/project";
import UserAddToTasks from "@/components/ui/userShearch/userAddToTask/userAddToTasks";
import Button from "@/components/ui/button/button";
import InputFunction from "@/components/ui/form/input";

export default function createTasks({ onClose }: { onClose?: () => void }) {
  const { fetchTasks, addTasks } = useProjectTasksStore();
  const params = useParams();
  const slugParam = params.slug;
  const normalizedId = Array.isArray(slugParam)
    ? slugParam[0]
    : (slugParam ?? "");
  const [id, setId] = useState<string>(normalizedId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const { projects, loading, error, fetchProjects } = useProjectStore();
  const [acProject, setAcproject] = useState<Project>();
  const [stBtn, setStBtn] = useState<boolean>(true);

  const Badge = [
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
    fetchProjects();
  }, []);
  useEffect(() => {
    setAcproject(projects.find((e) => e.id === normalizedId));
  }, [projects, normalizedId]);

  useEffect(() => {
    const isFormValid =
      title.trim() !== "" && description.trim() !== "" && dueDate !== "";
    setStBtn(!isFormValid);
  }, [title, description, dueDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTasks(id, title, description, priority, dueDate, assigneeIds);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setAssigneeIds([]); 
      onClose?.();
    } catch (error) {
    
      console.error("Erreur lors de la création de la tâche:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2>Créer une tâche</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
        <InputFunction
          valueInput={title}
          idvalue="title"
          type="text"
          onchange={(e) => setTitle(e.target.value)}
          labelText="Titre"
        />
        <InputFunction
          valueInput={description}
          idvalue="description"
          type="text"
          onchange={(e) => setDescription(e.target.value)}
          labelText="Description"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="dueDate">
            Date
          </label>
          <input
            onChange={(e) => setDueDate(new Date(e.target.value).toISOString())}
            id="dueDate"
            className="h-13  rounded-sm pt-5 pb-5 pr-4 pl-4 border border-gray-400 bg-white"
            type="date"
          />
        </div>
        <UserAddToTasks
          userMap={acProject?.members}
          onSelectionChange={(ids) => setAssigneeIds(ids)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {Badge.map((item) => (
              <span
                onClick={() => setPriority(() => item.status)}
                className="cardStyle"
                style={{
                  color: item.color,
                  backgroundColor: item.bgColor,
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: "fit-content",
                  borderRadius: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={item.status}
              >
                {item.textremplacement}
              </span>
            ))}
          </div>
        </div>
        <Button textBtn="+ Ajouter une tâche" disabled={stBtn} />
      </form>
    </div>
  );
}
