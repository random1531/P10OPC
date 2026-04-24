

# P10OPC

## Description

Application Next.js pour la gestion de projets et de tâches. Contient une interface utilisateur, un agent IA (LLM) configuré avec Mistral Medium, et des utilitaires pour créer/gérer des tâches et projets.

## Installation

1. Assurez-vous d'avoir Node.js (>=18) et npm installés.
2. Depuis la racine du projet, installez les dépendances :

```bash
npm install
```

Le projet utilise Next.js et la dépendance officielle Mistral : `@mistralai/mistralai` (déjà référencée dans `package.json`).

## Initialisation / Lancer le projet

- Mode développement :

```bash
npm run dev
```

- Construire :

```bash
npm run build
```

- Démarrer en production :

```bash
npm run start
```

## Fichier d'environnement (.env.local)

Créez un fichier `./.env.local` à la racine pour y placer vos variables d'environnement (ne pas committer). Exemple minimal pour définir des chemins ou variables utiles :

```env.local
# Variables d'exemple — adaptez-les à votre configuration
NEXT_PUBLIC_BASE_PATH="/"
APP_DATA_PATH="/path/to/data"

```

Remplacez les valeurs par vos chemins/clefs réels. Gardez ce fichier hors du contrôle de version.

## Fichier d'environnement (.env)

```env
# Clé api mistral
MISTRAL_API_KEY
# Clé agent
AGENT_ID
```
## Agent IA (information en anglais)

Info EN — LLM agent

This project is configured to use the Mistral Medium LLM for task generation. The npm package `@mistralai/mistralai` is listed in `package.json` and can be used to create requests to the model.

Agent responsibilities:
- Transform a user's natural language request into a list of tasks.

Response format rules (required):

- ALWAYS return a JSON array.
- Each element of the array must be an object with the following shape:

```json
{
	"title": "string",
	"description": "string",
	"dueDate": "YYYY-MM-DD"
}
```

- If there is only one task, return an array with a single element.
- If multiple tasks are needed, split the user request intelligently into several tasks.
- `title`: short and clear.
- `description`: detailed and reformulated.
- `dueDate`: use the provided date; otherwise use an empty string "".
- No text outside the JSON — the agent must output only the JSON array.

Example for agent configuration (pseudo-example of expected output when asked to "Prepare project presentation by 2026-05-01"):

```json
[
	{
		"title": "Draft presentation outline",
		"description": "Create a clear outline of the project presentation covering goals, timeline, key features and demo plan.",
		"dueDate": "2026-05-01"
	},
	{
		"title": "Prepare demo materials",
		"description": "Collect screenshots, demo data and prepare a short live demo script to show the main features.",
		"dueDate": "2026-05-01"
	}
]
```

Use this JSON contract when you call the LLM. The application will parse the returned JSON to create tasks in the system.

## Notes et bonnes pratiques

- Ne pas committer `/.env.local` ni les clés privées.
- Adapter les variables d'environnement selon votre déploiement.
- Le format JSON est strict : toute sortie non-JSON provoquera une erreur de parsing.



