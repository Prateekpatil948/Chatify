import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// ✅ ESM-safe dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ MUST be a string
const frontendPath = path.join(__dirname, "../../frontend/dist");

const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

// API routes (MUST come before static)
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production frontend serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  // ✅ SAFE SPA fallback (no wildcard, no path-to-regexp)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDB();
});
