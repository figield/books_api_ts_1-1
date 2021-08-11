import {RequestHandler, ErrorRequestHandler} from "express";

export const notFound: RequestHandler = (req, res, next) => {
  const err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
};

export class StatusError extends Error {
  constructor(readonly error: string | object, readonly status: number) {
    super();
  }
}

export const errorHandler: ErrorRequestHandler = (err: StatusError, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.error, error: isProduction() ? {} : err.stack });
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}
