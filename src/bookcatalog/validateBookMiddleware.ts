import { validateBook } from "./validateBook";
import {Request, Response, NextFunction} from "express";
import {StatusError} from "../error";

export function validate(req: Request, res: Response, next: NextFunction) {
  const result = validateBook(req.body);

  if(!result.success) {
    const error = new StatusError(result.error, 400);
    next(error);
  } else {
    next();
  }

}
