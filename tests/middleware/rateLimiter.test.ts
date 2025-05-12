import request from "supertest";
import express from "express";
import rateLimit from "express-rate-limit";
import checkApiKey from "../../src/middlewares/checkApiKey";
import { rateLimiter } from "../../src/middlewares/rateLimiter";

// 💡  create an isolated Express app for testing
const app = express();

app.use(express.json());

// Simulation .env for key check
process.env.FRONT_SECRET_KEY = "test-key";

app.use(rateLimiter);
app.use(checkApiKey);

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

describe("Rate limiter", () => {
  it("should block after 20 requests", async () => {
    for (let i = 0; i < 30; i++) {
      const res = await request(app)
        .get("/api/test")
        .set("x-api-key", "test-key");

      if (i < 20) {
        expect(res.status).toBe(200);
      } else {
        expect(res.status).toBe(429);
      }
    }
  });
});
