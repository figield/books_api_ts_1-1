import httpClient from "supertest";
import { appFactory } from "../../src/app";
import { connection } from "../../src/connection";
import assert from "assert";

describe("Book inventory", function () {
  it("allows to stock up the items", async function () {
    const app = appFactory(await connection);
    const request = httpClient(app);

    // CREATE
    const createResult = await request
      .post("/book")
      .send({
        title: "JavaScript in Action",
        authors: ["James Smith", "Kate Donovan"],
        isbn: "5123456789",
        description: "The ultimate JS book!",
      })
      .set("Content-Type", "application/json")
      .expect(302);

    // READ
    const readResult = await request
      .get(createResult.header.location)
      .set("Accept", "application/json")
      .expect(200);

    assert.deepStrictEqual(readResult.body, {
      title: "JavaScript in Action",
      slug: "javascript-in-action",
      authors: ["James Smith", "Kate Donovan"],
      isbn: "5123456789",
      description: "The ultimate JS book!",
    });
  });
});
