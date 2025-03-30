import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
  });
};
