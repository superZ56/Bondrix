import Calendar from "../models/CalendarModel.js";

// Récupère tous les événements d'un workspace
const getEvents = async (req, res) => {
  try {
    const events = await Calendar.find({ workspaceId: req.user.workspaceId }).sort({ date: 1, startTime: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Crée un événement
const createEvent = async (req, res) => {
  try {
    const { title, date, startTime, endTime, color } = req.body;
    const event = await Calendar.create({ workspaceId: req.user.workspaceId, title, date, startTime, endTime, color });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Modifie un événement
const updateEvent = async (req, res) => {
  try {
    const event = await Calendar.findOneAndUpdate(
      { _id: req.params.id, workspaceId: req.user.workspaceId },
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Événement introuvable" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprime un événement
const deleteEvent = async (req, res) => {
  try {
    const event = await Calendar.findOneAndDelete({ _id: req.params.id, workspaceId: req.user.workspaceId });
    if (!event) return res.status(404).json({ message: "Événement introuvable" });
    res.json({ message: "Événement supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export { getEvents, createEvent, updateEvent, deleteEvent };