import express from "express";
import {
  getProducts,
  getProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/get", getProducts);
router.get("/get/:id", getProduct);

export default router;
