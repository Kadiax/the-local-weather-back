import express, { Request, Response } from "express";
import { fetchAllWeatherData, fetchWeather } from "@/services/weatherService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) res.status(400).json({ error: "Missing lat/lon" });

  try {
    const data = await fetchWeather(Number(lat), Number(lon));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather API failed" });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) res.status(400).json({ error: "Missing lat/lon" });

  try {
    const data = await fetchAllWeatherData(Number(lat), Number(lon));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Weather API failed" });
  }
});

export default router;
