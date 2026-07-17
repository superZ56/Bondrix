import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import User from "./models/userModel.js";
import Note from "./models/NotesModel.js";
import Task from "./models/TasksModel.js";
import Calendar from "./models/CalendarModel.js";

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté\n");

    // --- Nettoyer les anciens tests ---
    await User.deleteMany({});
    await Note.deleteMany({});
    await Task.deleteMany({});
    await Calendar.deleteMany({});

    // --- 1. Créer un User ---
    const user = await User.create({
      username: "Zack",
      email: "zack@test.com",
      password: "123456",
      workspaceId: "ws_001",
    });
    console.log("User créé:", user.username, "| workspaceId:", user.workspaceId);

    // --- 2. Créer des dossiers et notes ---
    const dossierProjet = await Note.create({
      workspaceId: "ws_001",
      type: "folder",
      title: "Projet",
      parentId: null,
      path: "/",
    });

    const sousDossierFront = await Note.create({
      workspaceId: "ws_001",
      type: "folder",
      title: "Frontend",
      parentId: dossierProjet._id,
      path: `/${dossierProjet._id}/`,
    });

    const note1 = await Note.create({
      workspaceId: "ws_001",
      type: "note",
      title: "Brief projet",
      content: "# Brief\nContenu du brief...",
      parentId: dossierProjet._id,
      path: `/${dossierProjet._id}/`,
    });

    const note2 = await Note.create({
      workspaceId: "ws_001",
      type: "note",
      title: "Maquette React",
      content: "# Maquette\nComposants...",
      parentId: sousDossierFront._id,
      path: `/${dossierProjet._id}/${sousDossierFront._id}/`,
    });

    console.log("Dossier 'Projet' créé:", dossierProjet.title);
    console.log("Sous-dossier 'Frontend' créé:", sousDossierFront.title);
    console.log("Note 'Brief' créée:", note1.title);
    console.log("Note 'Maquette' créée:", note2.title);

    // --- Test : afficher le contenu du dossier Projet ---
    const contenuProjet = await Note.find({
      workspaceId: "ws_001",
      parentId: dossierProjet._id,
    });
    console.log("\nContenu du dossier 'Projet':");
    contenuProjet.forEach((item) => console.log(`  ${item.type === "folder" ? "📁" : "📄"} ${item.title}`));

    // --- 3. Créer des tâches ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const task1 = await Task.create({
      workspaceId: "ws_001",
      title: "Faire les courses",
      date: today,
      status: false,
      importance: "high",
    });

    const task2 = await Task.create({
      workspaceId: "ws_001",
      title: "Revoir le design",
      date: today,
      status: true,
      importance: "medium",
    });

    console.log("\nTâches du jour:");
    console.log(`  ☐ ${task1.title} (${task1.importance})`);
    console.log(`  ☑ ${task2.title} (${task2.importance})`);

    // --- 4. Créer un événement calendar ---
    const event = await Calendar.create({
      workspaceId: "ws_001",
      title: "Réunion équipe",
      date: today,
      startTime: "14:00",
      endTime: "15:30",
      color: "#FF5733",
    });

    console.log("\nÉvénement calendar:");
    console.log(`  📅 ${event.title} (${event.startTime} - ${event.endTime})`);

    console.log("\n✅ Tous les tests sont passés !");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB déconnecté");
  }
};

test();