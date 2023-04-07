import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import workoutRoutes from "./routes/workouts.js";

if (process.env.NODE_ENV === "production") {
} else {
  config();
}

const app = express();
// middleware
app.use(express.json());

// routes
app.use("/api/workouts", workoutRoutes);

// connect to mongodb
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(4000, () => {
    console.log("Connected to db  & Listening for", process.env.PORT);
  });
} catch (e) {
  console.log(e);
}
