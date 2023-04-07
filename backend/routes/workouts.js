import express from "express";
import Workout from "../models/workoutModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const workout = await Workout.find();
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).status({ error });
  }
});

export default router;
