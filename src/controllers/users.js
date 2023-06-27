import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const usersFilePath = "src/data/users.json";

const hello = (req, res) => {
  res.status(200).send("Hello");
};

const getUsers = (req, res) => {
  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      res.json(users);
    }
  });
};

const getUser = (req, res) => {
  const { user_id } = req.params;

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      const user = users.find((u) => u.id === user_id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Пользователя не существует");
      }
    }
  });
};

const createUser = (req, res) => {
  const { name, surname, username } = req.body;

  if (
    typeof name !== "string" ||
    typeof surname !== "string" ||
    typeof username !== "string"
  ) {
    res.status(400).send("Некорректные данные пользователя");
    return;
  }

  if (name.length < 2 || surname.length < 2 || username.length < 5) {
    res.status(400).send("Некорректные данные пользователя");
    return;
  }

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const users = JSON.parse(data);
      const newUser = { id: uuidv4(), name, surname, username, books: [] };
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
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const { name } = req.body;

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let users = JSON.parse(data.toString());
      const userIndex = users.findIndex(
        (u) => u.id.toString() === user_id.toString()
      );
      if (userIndex !== -1) {
        users[userIndex].name = name;

        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.status(200).json(users[userIndex]);
          }
        });
      } else {
        res.status(404).send("Пользователя не существует");
      }
    }
  });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let users = JSON.parse(data.toString());
      const userIndex = users.findIndex(
        (u) => u.id.toString() === user_id.toString()
      );
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.status(204).send("Пользователь удален");
          }
        });
      } else {
        res.status(404).send("Пользователя не существует");
      }
    }
  });
};

export { hello, getUsers, createUser, updateUser, deleteUser, getUser };
