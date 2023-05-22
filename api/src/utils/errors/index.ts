export * from "./errorTypes";

import { generalErrors } from "./generalErrors";

export interface ErrorSchema {
  [key: string]: ErrorValueSchema;
}

export interface ErrorValueSchema {
  message: string;
  statusCode: number;
  type: string;
}

export const errors: ErrorSchema = {
  ...generalErrors,
};
