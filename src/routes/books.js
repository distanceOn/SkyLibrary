import express from "express";
const bookRouter = express.Router();

import {
  getBooks,
  getBook,
  takeBook,
  returnBook,
  updateBook,
} from "../controllers/books.js";

bookRouter.get("/books", getBooks);
bookRouter.get("/books/:book_id", getBook);
bookRouter.get("/users/:user_id/books/:book_id", takeBook);
bookRouter.delete("/users/:user_id/books/:book_id", returnBook);
bookRouter.patch("/books/:book_id", updateBook);

export default bookRouter;
