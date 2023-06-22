import express from "express";
import fs from "fs";

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
  const userId = parseInt(req.params.user_id);
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

app.listen(3000, () => {
  console.log("Сервер запущен по адресу http://localhost:3000");
});
