import "dotenv/config";
import express from "express";
import cors from "cors";
import { initializeDatabase } from "./services/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;

const start = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Convergence 2K26 API running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
