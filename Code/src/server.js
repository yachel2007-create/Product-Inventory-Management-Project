import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/database.js";
import authRoutes from "./routes/auth.routes.js";
import ItemRoutes from "./routes/Item.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Item Inventory Management System");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/Items", ItemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
