import { ErrorResponse } from "./errorResponse";

interface MongooseError {
  name: string;
  code: number;
  errors: { error: { errors: { message: string }[] }[] };
  message: string;
}

export const serverErrorGenerator = (
  err: Error | MongooseError
): ErrorResponse => {
  let error = undefined;
  // Mongoose id not found
  if (err.name === "CastError") {
    const message = `resource not available`;
    error = new ErrorResponse(message, 404, "CastError");
    return error;
  }

  // Mongoose duplicate field

  if ("code" in err && err.code === 11000) {
    const message = `duplicate entry`;
    error = new ErrorResponse(message, 400, "DuplicateError");
    return error;
  }

  //Mongoose validation error

  if ("name" in err && "errors" in err && err.name === "ValidationError") {
    const message = Object.values(err.errors).map((item: any) => {
      return item.errors ? getErrorMessage(item.errors) : item.message;
    });
    error = new ErrorResponse(message.join(","), 400, "ValidationError");
    return error;
  }

  return new ErrorResponse(err.message, undefined, undefined);
};

const getErrorMessage = (errors: any): string => {
  let message = Object.values(errors).map((item: any) => {
    return item.message;
  });
  return message.join("/");
};
