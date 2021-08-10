import express from "express";

import { bookRoutesFactory } from "./bookcatalog/bookRoutes";

import { errorHandler, notFound } from "./error";

export const appFactory = (db) => {
  const app = express();

  const bookRoutes = bookRoutesFactory(db);

  const path = require("path");

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(express.json());
  app.get("/", function (req, res, next) {
    res.send("Hello World!");
  });
  app.use("/", bookRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
