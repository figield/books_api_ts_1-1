import { makeSlug } from "./makeSlug";
import {BookDTO, BookRepository} from "./book";

export interface BookService {
  createOrUpdate(book: BookDTO): Promise<void>;
}

export const bookServiceFactory = (bookRepository: BookRepository): BookService => ({
  async createOrUpdate(book: BookDTO) {
    const slug = makeSlug(book.title);
    await bookRepository.createOrUpdate({ ...book, slug });
  },
});
