import Library from "../models/book.js";
import User from "../models/user.js";

const getBooks = (req, res) => {
  Library.find({})
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const getBook = (req, res) => {
  const { book_id } = req.params;
  Library.findById(book_id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const takeBook = (req, res) => {
  const { user_id } = req.params;
  const { book_id } = req.params;

  Library.findById(book_id)
    .then((book) => {
      if (book) {
        return User.findByIdAndUpdate(
          user_id,
          { $addToSet: { books: book_id } },
          { new: true }
        );
      } else {
        throw new Error("Книга не найдена");
      }
    })
    .then(() => {
      res.status(200).send("Успешно взято!");
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const returnBook = (req, res) => {
  const { user_id } = req.params;
  const { book_id } = req.params;

  User.findByIdAndUpdate(user_id, { $pull: { books: book_id } })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  const { title } = req.body;

  Library.findByIdAndUpdate(book_id, { title }, { new: true })
    .then((updatedBook) => {
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        throw new Error("Книга не найдена");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

export { getBooks, getBook, takeBook, returnBook, updateBook };
