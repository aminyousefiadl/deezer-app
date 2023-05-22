import { NextFunction, Request, Response } from "express";
import { errorGenerator } from "../utils/errorGenerator";
import { ErrorResponse } from "../utils/errorResponse";
import { ErrorValueSchema } from "../utils/errors";
import { serverErrorGenerator } from "../utils/serverErrorGenerator";

class ErrorHandler {
  constructor(
    public error: ErrorResponse,
    public req: Request,
    public res: Response,
    public next: NextFunction
  ) {}

  findError(): void {
    let error: ErrorValueSchema = this.errorGenerator();
    if (error) {
      this.res.status(error.statusCode || 500).json({
        status: error.statusCode || 500,
        type: error.type || "CustomError",
        error: error.message || "internal server error",
      });
    } else {
      let error = this.serverErrorGenerator();
      this.res.status(error.statusCode || this.error.statusCode || 500).json({
        status: error.statusCode || this.error.statusCode || 500,
        type: error.type || this.error.type || "ServerError",
        error: error.message || this.error.message || "internal server error",
      });
    }
  }

  private errorGenerator(): ErrorValueSchema {
    return errorGenerator(this.error.message);
  }

  private serverErrorGenerator(): ErrorResponse {
    return serverErrorGenerator(this.error);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.warn(err);
  console.warn(err.stack as string);
  console.warn(err.name);

  const errorInstance = new ErrorHandler(err, req, res, next);

  errorInstance.findError();
};
