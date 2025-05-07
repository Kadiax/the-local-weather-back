import express, { Request, Response } from "express";
import { fetchLocationSearch } from "../services/mapService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const query = req.query.city as string;
  if (!query) res.status(400).json({ error: "Missing city query" });

  try {
    const data = await fetchLocationSearch(query);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Map API failed" });
  }
});

export default router;
