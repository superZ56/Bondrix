import express from "express";
import { handleSummarize } from "../controllers/aiController.js";

const router = express.Router();

router.post("/summarize", handleSummarize);

export default router;