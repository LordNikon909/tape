import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tapeRoutes from "./routes/tapeRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import cors from "cors";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tapes", tapeRoutes);
app.use("/api/trades", tradeRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));