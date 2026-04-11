import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

type Task = {
  title: string;
  dueDate: string;
  description: string;
};

type AgentResponse = {
  tasks: Task[];
};

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Texte requis" }, { status: 400 });
    }

    const client = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY,
    });

    const response = await client.beta.conversations.start({
      agentId: "ag_019d39eb7f2376348ed51f1009efbb40",
      agentVersion: 7,
      inputs: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    const lastOutput = response.outputs?.[response.outputs.length - 1];

    if (!lastOutput) {
      return NextResponse.json(
        { error: "Aucune réponse de l'agent" },
        { status: 500 },
      );
    }

    if (lastOutput.type !== "message.output") {
      return NextResponse.json(
        {
          error: "Type de sortie inattendu",
          output: lastOutput,
        },
        { status: 500 },
      );
    }

    const rawContent = lastOutput.content;

    if (typeof rawContent !== "string") {
      return NextResponse.json(
        {
          error: "Le contenu retourné n'est pas une chaîne JSON",
          output: lastOutput,
        },
        { status: 500 },
      );
    }

    let parsed: AgentResponse | Task[];

    try {
      parsed = JSON.parse(rawContent);
    } catch {
      return NextResponse.json(
        {
          error: "La réponse de l'agent n'est pas un JSON valide",
          raw: rawContent,
        },
        { status: 500 },
      );
    }

    let tasks: Task[] = [];
    if (Array.isArray(parsed)) {
      tasks = parsed;
    } else if (
      (parsed as AgentResponse).tasks &&
      Array.isArray((parsed as AgentResponse).tasks)
    ) {
      tasks = (parsed as AgentResponse).tasks;
    } else {
      return NextResponse.json(
        {
          error: "Le JSON retourné ne contient pas un tableau tasks valide",
          raw: parsed,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("POST /api/generate-tasks error:", error);

    return NextResponse.json(
      { error: "Erreur lors de la génération des tâches" },
      { status: 500 },
    );
  }
}