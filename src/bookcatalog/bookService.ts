import { makeSlug } from "./makeSlug";

export const bookServiceFactory = (bookRepository) => ({
  async createOrUpdate(book) {
    const slug = makeSlug(book.title);
    await bookRepository.createOrUpdate({ ...book, slug });
  },
});
