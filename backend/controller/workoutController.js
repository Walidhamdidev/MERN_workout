import mongoose from "mongoose";
import Workout from "../models/workoutModel.js";

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find().sort({ createdAt: -1 });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ msg: "No workout found" });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Not such workout" });

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) return res.status(404).json({ error: "No workout found" });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Not such workout" });

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!workout) return res.status(404).json({ error: "No workout found" });
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
