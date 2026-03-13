import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import vegetableRoute from "./routes/vegetable.route.js";
import orderRoute from "./routes/order.route.js";


dotenv.config();

const app = express();

/* ================= CORS CONFIG ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://vegetable-kappa.vercel.app" // Add your Vercel URL here
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("The CORS policy for this site does not allow access from the specified Origin."), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

/* ============== MIDDLEWARES ==================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= ROUTES ====================== */
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/vegetable", vegetableRoute);
app.use("/api/v1/order", orderRoute);

/* ================= TEST ROUTE ================== */
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Fresh Vegetable API",
    success: true,
  });
});

/* ================= SERVER ====================== */
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
