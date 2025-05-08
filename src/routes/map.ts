import express, { NextFunction, Request, Response } from "express";
import { fetchLocationSearch } from "@/services/mapService";

const router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = req.query.city as string;
    if (!query) {
      res.status(400).json({ error: "Missing city query" });
      return;
    }

    try {
      const data = await fetchLocationSearch(query);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
