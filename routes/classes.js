import { Router } from "express";
import Class from "../models/class.js";

const router = Router();

// GET /classes
router.get("/", async (req, res, next) => {
  try {
    const items = await Class.find().sort({ name: 1 });
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
});

// GET /classes/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Class.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, error: "Class not found" });
    res.json({ ok: true, item });
  } catch (err) {
    next(err);
  }
});

export default router;
