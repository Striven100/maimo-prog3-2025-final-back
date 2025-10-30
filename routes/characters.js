import { Router } from "express";
import Character from "../models/character.js";

const router = Router();

// GET /characters
router.get("/", async (req, res, next) => {
  try {
    const items = await Character.find()
      .populate("class", "name")
      .populate("species", "name")
      .sort({ createdAt: -1 });
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

// GET /characters/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Character.findById(req.params.id)
      .populate("class", "name")
      .populate("species", "name");
    if (!item) return res.status(404).json({ ok: false, error: "Character not found" });
    res.json({ ok: true, item });
  } catch (err) {
    next(err);
  }
});

// POST /characters
router.post("/", async (req, res, next) => {
  try {
    const { name, level, classId, speciesId, background } = req.body;
    const item = await Character.create({
      name,
      level,
      class: classId,
      species: speciesId,
      background: background ?? "",
    });
    res.status(201).json({ ok: true, item });
  } catch (err) {
    next(err);
  }
});

export default router;
