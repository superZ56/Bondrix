import Task from "../models/TasksModel.js";

// Récupère toutes les tâches d'un workspace (triées par date)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ workspaceId: req.user.workspaceId }).sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Crée une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, date, status, importance } = req.body;
    const task = await Task.create({ workspaceId: req.user.workspaceId, title, date, status, importance });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifie une tâche existante
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, workspaceId: req.user.workspaceId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprime une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, workspaceId: req.user.workspaceId });
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export { getTasks, createTask, updateTask, deleteTask };