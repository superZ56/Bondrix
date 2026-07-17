import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
    status: {
      type: Boolean,
      default: false, // false = à faire, true = terminée
    },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

// Index composite : toutes les tâches d'un workspace pour un jour donné
taskSchema.index({ workspaceId: 1, date: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;