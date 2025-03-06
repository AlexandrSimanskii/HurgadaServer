import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import excursion from "./routes/excursions.router.js";
import nightLive from "./routes/nightlive.router.js";
import food from "./routes/food.router.js";
import estate from "./routes/estate.router.js";
import authRouter from "./routes/auth.router.js";

dotenv.config();

mongoose
  .connect(
    process.env.MONGO ||
      "mongodb+srv://hurghada:hurghada@hurghada.f9gl5.mongodb.net/?retryWrites=true&w=majority&appName=hurghada"
  )
  .then(() => {
    console.log("Connect with MongoDB");
  })
  .catch((err) => console.log("Не удалось подключиться к MongoDB", err));

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

// 1
app.use("/api", authRouter);
app.use("/api/excursions", excursion);
app.use("/api/nights", nightLive);
app.use("/api/foods", food);
app.use("/api/estate", estate);
// 1

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Пиздец " });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = "Not Found" || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
