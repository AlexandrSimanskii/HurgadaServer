import express from "express";

import {
  getExcursions,
  getExcursionsCategories,getExcursion
} from "../controllers/excursions.controller.js";

const router = express.Router();
router.get("/get", getExcursions);
router.get("/get/:id", getExcursion);
router.get("/categories", getExcursionsCategories);


export default router;
