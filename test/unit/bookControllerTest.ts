import assert from "assert";
import { bookControllerFactory } from "../../src/bookcatalog/bookController";

describe("Book controller", function () {
  it("create or update happy path", async function () {
    // given
    const bookService = {
      async createOrUpdate() {},
    };
    const req = {
      body: {
        isbn: "ISBN",
      },
    };
    const res = {
      redirect(path) {
        // @ts-ignore
        res.redirect.invokedWith = path;
      },
    };
    // @ts-ignore
    const bookController = bookControllerFactory({ bookService });

    // when
    // @ts-ignore
    await bookController.createOrUpdate(req, res);

    // then
    // @ts-ignore
    assert.deepStrictEqual(res.redirect.invokedWith, "/book/ISBN");
  });

  it("create or update error", async function () {
    // given
    const req = { body: {} };
    const bookService = {
      async createOrUpdate() {
        throw new Error("sth bad happened");
      },
    };
    function next(error) {
      // @ts-ignore
      next.invokedWith = error;
    }
    // @ts-ignore
    const bookController = bookControllerFactory({ bookService });

    // when
    await bookController.createOrUpdate(req, null, next);

    // then
    // @ts-ignore
    assert.deepStrictEqual(next.invokedWith, new Error("sth bad happened"));
  });
});
