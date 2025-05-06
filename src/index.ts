import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // ou ton Netlify
  })
);

// Route test
app.get("/api/weather", (req: Request, res: Response) => {
  const city = req.query.city as string;
  console.log(`Requête reçue pour la ville : ${city}`, process.env.PORT);
  res.json({ message: "ok" });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🌍 Serveur backend en écoute sur http://localhost:${PORT}`);
});
