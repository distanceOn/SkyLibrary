import User from "../models/user.js";

const hello = (req, res) => {
  res.status(200).send("Hello");
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  User.findById(user_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const createUser = (req, res) => {
  const data = req.body;
  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndDelete(user_id)
    .then((user) => {
      res.status(200).send("Done");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

export { hello, getUsers, createUser, updateUser, deleteUser, getUser };
