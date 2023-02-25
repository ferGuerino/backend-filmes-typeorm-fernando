import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValid =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): Response | void => {
    const validateData = schema.parse(request.body);

    request.body = validateData;

    return next();
  };

export default ensureDataIsValid;
