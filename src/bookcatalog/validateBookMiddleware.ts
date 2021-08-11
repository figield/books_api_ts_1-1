import { validateBook } from "./validateBook";
import {Request, Response, NextFunction} from "express";
import {StatusError} from "../error";

export function validate(req: Request, res: Response, next: NextFunction) {
  const validateErrors = validateBook(req.body);

  if (validateErrors) {
    const error = new StatusError(validateErrors, 400);
    // error.message = validateErrors;
    // error.status = 400;
    next(error);
  } else {
    next();
  }
}
