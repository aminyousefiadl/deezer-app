import { errors, ErrorValueSchema } from "./errors";

export const errorGenerator = (message: string): ErrorValueSchema => {
  return errors[message];
};
