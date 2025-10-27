// routes/species.js
import { Router } from "express";
import Species from "../models/species.js";

const router = Router();

// GET /species
router.get("/", async (req, res, next) => {
  try {
    const items = await Species.find().sort({ name: 1 });
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

// GET /species/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Species.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, error: "Species not found" });
    res.json({ ok: true, item });
  } catch (err) {
    next(err);
  }
});

export default router;
