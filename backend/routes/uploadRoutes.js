import express from "express";
import multer from "multer";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Route pour upload des image

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadDir = join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ok = allowed.test(extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype.split("/")[1]);
    cb(null, !!ok);
  },
});

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Fichier non valide" });
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;