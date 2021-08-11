import { makeSlug } from "./makeSlug";
import {BookDTO, BookRepository} from "./book";

export const bookServiceFactory = (bookRepository: BookRepository) => ({
  async createOrUpdate(book: BookDTO) {
    const slug = makeSlug(book.title);
    await bookRepository.createOrUpdate({ ...book, slug });
  },
});
