import type { NextApiRequest, NextApiResponse } from 'next';
import { Mistral } from "@mistralai/mistralai";



const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Texte requis' });

  try {
    const messages = [{ role: "user", content: text }];
    const response = await client.beta.conversations.start({
      agentId: "ag_019d39eb7f2376348ed51f1009efbb40",
      agentVersion: 4,
      inputs: messages,
    });

   
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la génération des tâches" });
  }
}