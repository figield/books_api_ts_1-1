import { validateBook } from "./validateBook";

export function validate(req, res, next) {
  const validateErrors = validateBook(req.body);

  if (validateErrors) {
    const error = new Error();
    // @ts-ignore
    error.message = validateErrors;
    // @ts-ignore
    error.status = 400;
    next(error);
  } else {
    next();
  }
}
