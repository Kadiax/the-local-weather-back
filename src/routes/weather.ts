import express, { NextFunction, Request, Response } from "express";
import { fetchAllWeatherData, fetchWeather } from "@/services/weatherService";

const router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400).json({ error: "Missing lat/lon" });
      return;
    }

    try {
      const data = await fetchWeather(Number(lat), Number(lon));
      res.json(data);
    } catch (err) {
      const e = err as Error;
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400).json({ error: "Missing lat/lon" });
      return;
    }

    try {
      const data = await fetchAllWeatherData(Number(lat), Number(lon));
      res.json(data);
    } catch (err) {
      const e = err as Error;
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
