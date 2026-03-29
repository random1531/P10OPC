import { useState } from "react";
import IaTask from "./task/iaTask";

type Task = {
  title: string;
  description: string;
  dueDate: string;
};

export default function TaskGenerator() {
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
          <h2>Tâches générées</h2>

          {tasks.map((task, index) => (
            <IaTask
              key={index}
              TaskName={task.title}
              Description={task.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
