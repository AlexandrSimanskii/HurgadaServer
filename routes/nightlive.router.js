import express from "express";

import {
  getNightLives,
  getNightLive,
  getNightCategories,
} from "../controllers/night.controller.js";

const router = express.Router();

router.get("/get", getNightLives);
router.get("/get/:id",getNightLive );
router.get("/categories", getNightCategories);

export default router;
