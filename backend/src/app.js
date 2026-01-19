import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dataRoutes from "./routes/data.routes.js";
import weddingRoutes from "./routes/wedding.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import testRoutes from "./routes/test.routes.js";
import gameRoutes from "./routes/game.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/", authRoutes);
app.use("/api", dataRoutes);
app.use("/api/wedding", weddingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/test", testRoutes);
app.use("/api/games", gameRoutes);

export default app;
