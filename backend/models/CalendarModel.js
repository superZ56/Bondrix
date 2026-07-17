import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: [true, "L'heure de début est requise"],
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Format HH:mm requis"],
    },
    endTime: {
      type: String,
      required: [true, "L'heure de fin est requise"],
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Format HH:mm requis"],
    },
    color: {
      type: String,
      default: "#3B82F6", // bleu par défaut
      match: [/^#[0-9A-Fa-f]{6}$/, "Couleur hexadécimale invalide"],
    },
  },
  {
    timestamps: true,
  }
);

// Index composite : tous les événements d'un workspace pour un mois/jour donné
calendarSchema.index({ workspaceId: 1, date: 1 });

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;