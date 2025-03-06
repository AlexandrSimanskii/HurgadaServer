import express from "express";

import {
  getFoods,
  getFood,
  getFoodCategories,
} from "../controllers/food.controller.js";

const router = express.Router();
router.get("/get", getFoods);
router.get("/get/:id", getFood);
router.get("/categories", getFoodCategories);

export default router;
