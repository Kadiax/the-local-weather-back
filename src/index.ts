import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mapRoutes from "@/routes/map";
import weatherRoutes from "@/routes/weather";
import { validateEnv } from "@/utils/validateEnv";
import checkApiKey from "@/middlewares/checkApiKey";
import { rateLimiter } from "@/middlewares/rateLimiter";

dotenv.config();

validateEnv([
  "PORT",
  "MAPBOX_KEY",
  "MAPBOX_BASE_URL",
  "OPENWEATHERMAP_KEY",
  "OPENWEATHERMAP_BASE_URL",
  "ALLOWED_ORIGINS",
  "FRONT_SECRET_KEY",
]);

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(checkApiKey);
app.use(rateLimiter);

app.use("/api/map", mapRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server ready on http://localhost:${process.env.PORT}`);
});
