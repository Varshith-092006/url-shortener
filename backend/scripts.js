import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import express from "express";
import router from "./routes/shortenroute.js";
import cors from "cors";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect Database
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173","https://url-shortener-peach-zeta.vercel.app"], // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you're using cookies/auth
  })
);
// Routes
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
