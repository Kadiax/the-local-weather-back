import { Request, Response, NextFunction, RequestHandler } from "express";

const checkApiKey: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingKey = req.headers["x-api-key"];
  const validKey = process.env.FRONT_SECRET_KEY;

  try {
    if (!incomingKey || incomingKey !== validKey) {
      throw new Error("Access denied");
    }
    return next();
  } catch (error) {
    const e = error as Error;
    res.status(403).json({ error: e.message });
  }
};

export default checkApiKey;
