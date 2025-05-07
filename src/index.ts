import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mapRoutes from "@/routes/map";
import weatherRoutes from "@/routes/weather";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/map", mapRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 3000;

if (!process.env.MAPBOX_KEY) {
  throw new Error("MAPBOX_KEY is not defined in the environment variables");
}
if (!process.env.MAPBOX_BASE_URL) {
  throw new Error(
    "MAPBOX_BASE_URL is not defined in the environment variables"
  );
}
if (!process.env.OPENWEATHERMAP_KEY) {
  throw new Error(
    "OPENWEATHERMAP_KEY is not defined in the environment variables"
  );
}
if (!process.env.OPENWEATHERMAP_BASE_URL) {
  throw new Error(
    "OPENWEATHERMAP_BASE_URL is not defined in the environment variables"
  );
}

app.listen(PORT, () => {
  console.log(`✅ Server ready on http://localhost:${PORT}`);
});
