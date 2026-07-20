import { summarizeNote } from "../AI/index.js";

export async function handleSummarize(req, res) {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Le contenu est requis." });
    }

    const summary = await summarizeNote(content);
    res.json({ summary });
  } catch (error) {
    console.error("Erreur summarize:", error.message);
    res.status(500).json({ error: "Erreur lors du résumé." });
  }
}