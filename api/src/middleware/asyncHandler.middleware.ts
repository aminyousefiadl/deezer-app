import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
export const asyncServiceHandler =
  (fn: (data: any, next: NextFunction) => any) =>
  (data: any, next: NextFunction) => {
    try {
      return fn(data, next);
    } catch (error) {
      next(error);
    }
  };
