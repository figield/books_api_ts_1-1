export interface BookRepository {
    createOrUpdate(book: Book): Promise<void>;
    findOne(isbn: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
}

// export type BookDTO = {
//     isbn: string;
//     title: string;
//     authors: string[];
//     description: string;
// };
//
// export type Book = BookDTO & { slug: string };

export interface BookDTO {
    isbn: string;
    title: string;
    authors: string[];
    description: string;

}
export interface Book extends BookDTO {
    slug: string;
}