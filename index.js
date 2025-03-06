import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "../routes/auth.router.js";
import excursion from "../routes/excursions.router.js";
import nightLive from "../routes/nightlive.router.js";
import food from "../routes/food.router.js";
import estate from "../routes/estate.router.js";

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://simabmv:simabmv@mebel.rqqf8m1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const app = express();

const PORT = process.env.PORT || 3004;
const CORS_ORIGIN =
  process.env.CORS_ORIGIN || "https://mebel-frontend.vercel.app";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/excursions", excursion);
app.use("/api/nights", nightLive);
app.use("/api/foods", food);
app.use("/api/estate", estate);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Пиздец " });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = "Not Found" || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
