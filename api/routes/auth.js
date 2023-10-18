import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;

// Routes: In the backend, routes define the URL endpoints that the server responds to. They handle incoming HTTP requests and route them to appropriate controller functions.
