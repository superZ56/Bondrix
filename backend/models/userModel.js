import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est requis"],
      trim: true,
      minlength: [4, "Le nom doit contenir au moins 4 caractères"],
      maxlength: [20, "Le nom ne peut pas dépasser 20 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    workspaceId: {
      type: String,
      required: true,
    },
  },
  {
    // Ajoute automatiquement createdAt et updatedAt
    timestamps: true,
  }
);

// Avant de sauvegarder un user dans la DB, on hash le password
// Ce hook ne s'exécute QUE quand le password est modifié
// Sans ça, le password serait stocké en clair et le login ne marcherait jamais
userSchema.pre("save", async function () {
  // Si le password n'a pas été modifié, on passe au suivant
  if (!this.isModified("password")) return ;

  // bcrypt.hash() transforme "123456" en "$2a$10$xYz..."
  // Le 10 = le "salt rounds" = la complexité du hash (10 = standard)
  this.password = await bcrypt.hash(this.password, 10);
  
});

const User = mongoose.model("User", userSchema);

export default User;