import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignup);

export default router;
