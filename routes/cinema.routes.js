import express from "express";
import Cinema from "../models/Cinema.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await Cinema.find().populate("movies"));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await Cinema.create(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;