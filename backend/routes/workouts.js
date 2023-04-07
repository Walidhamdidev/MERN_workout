import express from "express";
import workoutController from "../controller/workoutController.js";

const router = express.Router();

router.post("/", workoutController.createWorkout);
router.get("/", workoutController.getWorkouts);
router.get("/:id", workoutController.getWorkout);
router.delete("/:id", workoutController.deleteWorkout);
router.patch("/:id", workoutController.updateWorkout);

export default router;
