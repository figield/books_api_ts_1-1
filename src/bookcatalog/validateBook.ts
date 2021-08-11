import { z } from "zod";

const BookSchema = z.object({
    title: z.string().min(1).max(100),
    authors: z.array(z.string().min(1).max(50)).min(1).max(10),
    description: z.optional(z.string().max(5000)),
    isbn: z.string().length(10)
});
export type BookDTO = z.infer<typeof BookSchema>;

export function validateBook(book: unknown) {
    return BookSchema.safeParse(book);
}