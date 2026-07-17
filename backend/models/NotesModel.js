import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["folder", "note"],
      required: true,
    },
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    content: {
      type: String,
      default: null, // null si c'est un dossier
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null, // null = racine
      ref: "Note",
    },
    path: {
      type: String,
      default: "/",
    },
  },
  {
    timestamps: true,
  }
);

// Index composite : retrouver rapidement les éléments d'un dossier
// dans un workspace donné
noteSchema.index({ workspaceId: 1, parentId: 1 });
noteSchema.index({ workspaceId: 1, path: 1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;