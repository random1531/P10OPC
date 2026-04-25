import { useState } from "react";
import IaTask from "./iaTask";
import { AddTasksToproject } from "@/features/task/api";
import { HiSparkles } from "react-icons/hi";
import Loader from "../../tools/loader";
import { useProjectTasksStore } from "@/store/useProjectTasksStore";
import Button from "../../button/button";

type Task = {
  title: string;
  dueDate: string;
  description: string;
};

export default function TaskGenerator({
  idPorject,
  onClose,
}: {
  idPorject: string;
  onClose?: () => void;
}) {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [error, setError] = useState("");
  const { fetchTasks } = useProjectTasksStore();

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setError("");
    setStep("loading");

    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération des tâches");
      }

      const data = await response.json();

      setTasks(data.tasks || []);
      setStep("result");
    } catch (err) {
      setError("Une erreur est survenue.");
      setStep("input");
    }
  };

  const handleSubmitTasks = async () => {
    await Promise.all(
      tasks.map((element) =>
        AddTasksToproject({
          id: idPorject,
          title: element.title,
          description: element.description,
          dueDate: element.dueDate,
          priority: "MEDIUM",
          assigneeIds: [],
        }),
      ),
    );

    await fetchTasks(idPorject);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full">
      {step === "input" && (
        <div className="flex flex-col justify-between h-full">
          <div className="w-full flex ">
            <HiSparkles className="text-orange-400 flex items-center justify-center" />
            <h2 className="text-[#1F1F1F] font-semibold text-2xl">
              Créer une tâche
            </h2>
          </div>
          <div className="relative">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex: Préparer la réunion demain et envoyer le compte rendu vendredi"
              className="gap-2.5 rounded-[80px] pt-4.5 pr-8 pb-4.5 pl-8 w-full bg-gray-50"
            />
            <HiSparkles
              onClick={handleSubmit}
              className="text-orange-400 flex items-center justify-center absolute right-2 top-4 w-6 h-6"
            />
          </div>

          {error && <p>{error}</p>}
        </div>
      )}

      {step === "loading" && (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <p>Analyse en cours...</p>
          <Loader />
        </div>
      )}

      {step === "result" && (
        <div className="flex flex-col gap-6">
          <div className="w-full flex ">
            <HiSparkles className="text-orange-400 flex items-center justify-center" />
            <h2 className="text-[#1F1F1F] font-semibold text-2xl">
              Vos tâches...
            </h2>
          </div>
          {tasks.map((task, index) => (
             <IaTask
              key={index}
              TaskName={task.title}
              Description={task.description}
              handleDelete={() =>
                setTasks((prev) => prev.filter((_, i) => i !== index))
              }
              onChangeName={(val) =>
                setTasks((prev) => prev.map((t, i) => (i === index ? { ...t, title: val } : t)))
              }
              onChangeDescription={(val) =>
                setTasks((prev) => prev.map((t, i) => (i === index ? { ...t, description: val } : t)))
              }
            />
          ))}

          <Button textBtn="Enregistrer" onclick={handleSubmitTasks} />
        </div>
      )}
    </div>
  );
}
