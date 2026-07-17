import Note from "../models/NotesModel.js";

// Récupère toutes les notes/dossiers d'un workspace
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ workspaceId: req.user.workspaceId }).sort({ type: 1, title: 1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Crée une note ou un dossier
const createNote = async (req, res) => {
  try {
    const { type, title, content, parentId } = req.body;
    const path = parentId ? await Note.findById(parentId).then(p => p.path + parentId + "/") : "/";
    const note = await Note.create({ workspaceId: req.user.workspaceId, type, title, content, parentId, path });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifie une note ou un dossier
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, workspaceId: req.user.workspaceId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note introuvable" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprime une note ou un dossier
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, workspaceId: req.user.workspaceId });
    if (!note) return res.status(404).json({ message: "Note introuvable" });
    await Note.deleteMany({ parentId: req.params.id });
    res.json({ message: "Note supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export { getNotes, createNote, updateNote, deleteNote };