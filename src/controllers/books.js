import fs from "fs";

const usersFilePath = "src/data/users.json";
const booksFilePath = "src/data/books.json";

const getBooks = (req, res) => {
  fs.readFile(booksFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const books = JSON.parse(data);
      res.json(books);
    }
  });
};

const getBook = (req, res) => {
  const bookId = parseInt(req.params.book_id);
  fs.readFile(booksFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const books = JSON.parse(data);
      const book = books.find((b) => b.id === bookId);
      if (book) {
        res.json(book);
      } else {
        res.status(404).send("Такой книги нет");
      }
    }
  });
};

const takeBook = (req, res) => {
  const { user_id } = req.params;
  const bookId = parseInt(req.params.book_id);
  fs.readFile(usersFilePath, (err, userData) => {
    if (err) {
      res.sendStatus(500);
    } else {
      fs.readFile(booksFilePath, (err, bookData) => {
        if (err) {
          res.sendStatus(500);
        } else {
          let users = JSON.parse(userData);
          let books = JSON.parse(bookData);
          const userIndex = users.findIndex((u) => u.id === user_id);
          const bookIndex = books.findIndex((b) => b.id === bookId);
          if (userIndex !== -1 && bookIndex !== -1) {
            const user = users[userIndex];
            const book = books[bookIndex];
            if (!user.books.find((b) => b.id === book.id)) {
              user.books.push(book);
              fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
                if (err) {
                  res.sendStatus(500);
                } else {
                  res.status(200).send("Успешно взято!");
                }
              });
            } else {
              res.status(400).send("Книга уже взята пользователем");
            }
          } else {
            res.status(404).send("Пользователь или книга не найдены");
          }
        }
      });
    }
  });
};

const returnBook = (req, res) => {
  const { user_id } = req.params;
  const bookId = parseInt(req.params.book_id);

  fs.readFile(usersFilePath, (err, userData) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let users = JSON.parse(userData);
      const userIndex = users.findIndex((u) => u.id === user_id);
      const user = users[userIndex];
      if (user.books.find((b) => parseInt(b.id) === bookId)) {
        user.books = user.books.filter((b) => b.id !== bookId);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(204);
          }
        });
      } else {
        res.status(404).send("Пользователь или книга не найдены");
      }
    }
  });
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  const { title } = req.body;

  fs.readFile(booksFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let books = JSON.parse(data.toString());
      const bookIndex = books.findIndex(
        (u) => parseInt(u.id) === parseInt(book_id)
      );
      if (bookIndex !== -1) {
        books[bookIndex].title = title;

        fs.writeFile(booksFilePath, JSON.stringify(books), (err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.status(200).json(books[bookIndex]);
          }
        });
      } else {
        res.status(404).send("Книги не существует");
      }
    }
  });
};

export { getBooks, getBook, takeBook, returnBook, updateBook };
