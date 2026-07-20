/*

- Charge le prompt depuis le fichier .txt
- Remplace {{CONTENT}} par le vrai contenu de la note
- Appelle le service IA avec une température basse (réponses factuelles)

*/

import ai from "../ai.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const promptTemplate = readFileSync(
  join(__dirname, "../prompts/summarize.txt"),
  "utf-8"
);

// Supprime les préambules et conclusions parasites de l'IA
function cleanResponse(text) {
  const clean = text
    .replace(/^[\s\S]*?(?=En résumé|Le résumé|En quelques|Here|The|This|\*\*|##|#)/i, '')
    .replace(/\n*(J'hope|J'espère|I hope|En espérant|Voici|Ce texte|Ce résumé|Le présent|L'objectif|En conclusion|To summarize|In summary)[\s\S]*$/i, '')
    .trim()
  return clean || text
}

export async function summarizeNote(noteContent) {
  const prompt = promptTemplate.replace("{{CONTENT}}", noteContent);
  const response = await ai.generate(prompt, { temperature: 0.3, maxTokens: 256 });
  return cleanResponse(response);
}