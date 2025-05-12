import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  message: "Too many requests. Try again in a minute.",
  standardHeaders: true, // X-RateLimit-* headers
  legacyHeaders: false, // pas les vieux headers
});
