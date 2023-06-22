import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const usersFilePath = "src/data/users.json";
const booksFilePath = "src/data/books.json";

app.get("/users", (req, res) => {
  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      res.json(users);
    }
  });
});

app.get("/users/:user_id", (req, res) => {
  const userId = req.params.user_id;
  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      const user = users.find((u) => u.id === userId);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      const newUser = { id: uuidv4(), name, books: [] };
      users.push(newUser);
      fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.status(201).json(newUser);
        }
      });
    }
  });
});

app.delete("/users/:user_id", (req, res) => {
  const userId = req.params.user_id;

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let users = JSON.parse(data.toString());
      const userIndex = users.findIndex(
        (u) => u.id.toString() === userId.toString()
      );
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(204);
          }
        });
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.get("/books", (req, res) => {
  fs.readFile(booksFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const books = JSON.parse(data);
      res.json(books);
    }
  });
});

app.get("/books/:book_id", (req, res) => {
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
        res.sendStatus(404);
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Сервер запущен по адресу http://localhost:3000");
});
