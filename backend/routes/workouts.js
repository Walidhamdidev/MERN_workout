import express from "express";
import workoutController from "../controller/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", workoutController.createWorkout);
router.get("/", workoutController.getWorkouts);
router.get("/:id", workoutController.getWorkout);
router.delete("/:id", workoutController.deleteWorkout);
router.patch("/:id", workoutController.updateWorkout);

export default router;
