import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";

config();
const app = express();
// middleware
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "https://workout-frontend-1und.onrender.com" }));
} else {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to mongodb
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(4000, () => {
    console.log("Connected to db  & Listening for", process.env.PORT);
  });
} catch (e) {
  console.log(e);
}
