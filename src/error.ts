import {RequestHandler, ErrorRequestHandler} from "express";

export const notFound: RequestHandler = (req, res, next) => {
  const err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ message: err.message, error: isProduction() ? {} : err.stack });
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}
