import { bookServiceFactory } from "../../src/bookcatalog/bookService";
import { bookRepositoryFactory } from "../../src/bookcatalog/inMemoryBookRepository";
import assert from "assert";

describe("Book service", function () {
  it("can create a book", async function () {
    // given
    const bookRepository = bookRepositoryFactory();
    const bookService = bookServiceFactory(bookRepository);

    // when
    await bookService.createOrUpdate({ title: "some title", isbn: "ISBN" });

    // then
    const book = await bookRepository.findOne("ISBN");
    assert.deepStrictEqual(book, {
      title: "some title",
      slug: "some-title",
      isbn: "ISBN",
    });
  });
});
