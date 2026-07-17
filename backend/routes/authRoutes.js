import express from "express";
import { register, login, googleLogin, getMe, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register → Créer un compte
router.post("/register", register);

// POST /api/auth/login → Se connecter (email + password)
router.post("/login", login);

// POST /api/auth/google → Se connecter avec Google
router.post("/google", googleLogin);

// GET /api/auth/me → Voir son profil (protégé, nécessite un token JWT)
router.get("/me", protect, getMe);

//logout 
router.post("/logout", protect, logout);


export default router;