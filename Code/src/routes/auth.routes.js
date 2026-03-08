import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();


authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.delete("/:id", protect, deleteUser);


export default authRoutes;
