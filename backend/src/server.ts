import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import skillsRoutes from "./routes/skills";
import matchesRoutes from "./routes/matches";
import requestsRoutes from "./routes/requests";
import messagesRoutes from "./routes/messages";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/skills", skillsRoutes);
app.use("/matches", matchesRoutes);
app.use("/requests", requestsRoutes);
app.use("/messages", messagesRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  },
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
