import express from "express";

import { getEstate } from "../controllers/estate.controller.js";

const router = express.Router();
router.get("/get",getEstate);

export default router;