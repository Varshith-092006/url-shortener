import express from "express";
import { shorten, redirectToUrl } from "../controllers/shorten.js";

const router = express.Router();

// POST /api/shorten → create short URL
router.post("/shorten", shorten);

// GET /api/:code → redirect to original URL
router.get("/:code", redirectToUrl);

export default router;
    