import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// GET todas
router.get("/", async (req, res, next) => {
  try {
    res.json(await Movie.find());
  } catch (err) {
    next(err);
  }
});

// GET por id
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

// POST crear
router.post("/", async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

// PUT modificar
router.put("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

// DELETE eliminar
router.delete("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada", movie });
  } catch (err) {
    next(err);
  }
});

export default router;