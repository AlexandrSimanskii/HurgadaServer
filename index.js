import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import authRouter from "../routes/auth.router.js";

// import food from "../routes/food.router.js";
// import estate from "../routes/estate.router.js";
// import excursion from "../routes/excursions.router.js";
// import nightLive from "../routes/nightlive.router.js";

// import cors from "cors";

const app = express();

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

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://hurgada-pi.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.get("/api", (req, res) => res.send("Express on Vercel"));
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

app.use(cookieParser());
app.use(express.json());

// app.use("/api", authRouter);
// app.use("/api/excursions", excursion);
// app.use("/api/nights", nightLive);
// app.use("/api/foods", food);
// app.use("/api/estate", estate);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Пиздец " });
});
