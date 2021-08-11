import {Db} from "mongodb";
import {Book, BookRepository} from "./book";

export const bookRepositoryFactory = (db: Db): BookRepository => {
  const books = db.collection("books");
  return {
    async createOrUpdate(book: Book) {
      await books.updateOne(
        { isbn: book.isbn },
        { $set: book },
        { upsert: true }
      );
    },
    async findOne(isbn: string) {
      return books.findOne({ isbn }, { projection: { _id: 0 } });
    },
    async findAll() {
      return books.find({}, { projection: { _id: false } }).toArray();
    },
  };
};
