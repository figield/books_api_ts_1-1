import { resources } from "./links";
import { bookRepositoryFactory } from "./bookRepository";
import { bookServiceFactory } from "./bookService";
import { Router } from "express";
import { bookControllerFactory } from "./bookController";
import { validate } from "./validateBookMiddleware";
import {Db} from "mongodb";

export const bookRoutesFactory = (db: Db) => {
  const { BOOK, BOOK_COLLECTION } = resources;
  const router = Router();
  const bookRepository = bookRepositoryFactory(db);
  const bookService = bookServiceFactory(bookRepository);
  const { createOrUpdate, details, getList } = bookControllerFactory({
    bookService,
    bookRepository,
  });

  router.post(BOOK_COLLECTION, validate, createOrUpdate);
  router.get(BOOK_COLLECTION, getList);
  router.get(BOOK, details);

  return router;
};
