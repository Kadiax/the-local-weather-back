import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mapRoutes from "./routes/map";
import weatherRoutes from "./routes/weather";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/map", mapRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 3000;
if (!process.env.MAPBOX_TOKEN) {
  throw new Error("MAPBOX_TOKEN is not defined in the environment variables");
}

app.listen(PORT, () => {
  console.log(`✅ Server ready on http://localhost:${PORT}`);
});
