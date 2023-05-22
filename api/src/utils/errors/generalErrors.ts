import { ErrorSchema } from "./index";
import { GENERAL_ERROR_TYPES } from "./errorTypes";

export const generalErrors: ErrorSchema = {
  [`${GENERAL_ERROR_TYPES.GENERAL}-${GENERAL_ERROR_TYPES.INPUT}`]: {
    message: "Insufficient data",
    statusCode: 422,
    type: GENERAL_ERROR_TYPES.INPUT,
  },

  [`${GENERAL_ERROR_TYPES.GENERAL}-${GENERAL_ERROR_TYPES.QUERY}`]: {
    message: "Request query issue",
    statusCode: 400,
    type: GENERAL_ERROR_TYPES.QUERY,
  },
};
