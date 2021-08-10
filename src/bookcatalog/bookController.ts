// class BookController {
//     BookController() {
//         this.bookRepository = new BookRepository();
//         this.bookService = new BookService();
//     }
// }
import mapValues from "lodash.mapvalues";
import { bookLink } from "./links";

// const mapValues = (api, f) => Object.fromEntries(Object.entries(api).map(([key, value]) => [key, f(value)]));

function withErrorHandling(api) {
  return mapValues(api, wrapWithTryCatch);
}

function wrapWithTryCatch(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

export const bookControllerFactory = ({ bookService, bookRepository }) =>
  withErrorHandling({
    async createOrUpdate(req, res, next) {
      // HTTP
      const { title, authors, isbn, description } = req.body;
      // JS
      await bookService.createOrUpdate({ title, authors, isbn, description });
      // HTTP
      res.redirect(bookLink(isbn));
    },
    async details(req, res, next) {
      const isbn = req.params.isbn;
      const book = await bookRepository.findOne(isbn);
      res.format({
        "text/html"() {
          res.render("book", { book, layout: "layout" });
        },
        "application/json"() {
          res.json(book);
        },
        default() {
          res.json(book);
        },
      });
    },
    async getList(req, res) {
      const books = await bookRepository.findAll();

      res.format({
        "text/html"() {
          res.render("books", {
            books: books.map((book) => ({ ...book, url: bookLink(book.isbn) })),
            layout: "layout",
          });
        },
        "application/json"() {
          res.json(books);
        },
        default() {
          res.json(books);
        },
      });
    },
  });
