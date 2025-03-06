import express from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

router.get("/signout", signOut);

export default router;
