// ============================================
// server.js
// Point d'entrée principal du backend
// ============================================

import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/uploadRoutes.js";


connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


// Uploads images

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use("/api/upload", uploadRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Bondrix opérationnelle" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port : ${PORT}`);
});