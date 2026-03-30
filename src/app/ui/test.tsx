import { useState } from "react";
import IaTask from "./task/iaTask";
import { AddTasksToproject } from "../(protected)/function";

type Task = {
  title: string;
  dueDate: string;
  description: string;
};

export default function TaskGenerator({idPorject}:{idPorject:string}) {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [error, setError] = useState("");
  console.log(tasks);

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
    // send all tasks; provide required priority and assigneeIds fields
    await Promise.all(
      tasks.map((element) =>
        AddTasksToproject({
          id: idPorject,
          title: element.title,
          description: element.description,
          dueDate: element.dueDate,
          priority: "MEDIUM",
          assigneeIds: [],
        })
      )
    );
  };

  return (
    <div>
      {step === "input" && (
        <div>
          <h2>Décris les tâches à créer</h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Préparer la réunion demain et envoyer le compte rendu vendredi"
            rows={6}
          />

          <button onClick={handleSubmit}>Envoyer</button>

          {error && <p>{error}</p>}
        </div>
      )}

      {step === "loading" && (
        <div>
          <p>Analyse en cours...</p>
          <p>Loader ici</p>
        </div>
      )}

      {step === "result" && (
        <div className="flex flex-col gap-6">
          {tasks.map((task, index) => (
            <IaTask
              key={index}
              TaskName={task.title}
              Description={task.description}
            />
          ))}
          <button onClick={handleSubmitTasks}>Enregistrer</button>
        </div>
      )}
    </div>
  );
}
