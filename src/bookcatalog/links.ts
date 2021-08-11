// const links = {
//   resources: {
//     BOOK: "/book/:isbn",
//     BOOK_COLLECTION: "/book",
//   },
//   bookLink(isbn) {
//     return links.resources.BOOK.replace(":isbn", isbn);
//   },
// };

export const resources = {
  BOOK: "/book/:isbn",
  BOOK_COLLECTION: "/book",
};
export function bookLink(isbn: string) {
  return resources.BOOK.replace(":isbn", isbn);
}
