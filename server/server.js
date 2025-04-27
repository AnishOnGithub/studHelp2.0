import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path"; // <== Important for serving frontend
import { fileURLToPath } from "url"; // <== Since you are using ES Modules
import userRoutes from "./routes/userRoutes.js";

// Setup for ES Modules (__dirname equivalent)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Backend API routes
app.use("/api/users", userRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    const MONGODB_URI = "mongodb+srv://anish:anish@cluster0.elmkvv8.mongodb.net/"; // Replace this with your MongoDB URI
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Serve frontend static files
const frontendBuildPath = path.join(__dirname, "../build");
app.use(express.static(frontendBuildPath));

// Handle any other routes by serving React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
