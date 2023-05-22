import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ErrorResponse } from "../utils/errorResponse";

let schema = yup.object().shape({});

const searchAlbumSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let isValid = await schema.validate(req.query, { stripUnknown: true });
    req.body = isValid;
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

export { searchAlbumSchema };
