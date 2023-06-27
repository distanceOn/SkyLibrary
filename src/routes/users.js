import express from "express";
const userRouter = express.Router();

import {
  getUsers,
  hello,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/users.js";

userRouter.get("/", hello);
userRouter.get("/users", getUsers);
userRouter.get("/users/:user_id", getUser);
userRouter.post("/users", createUser);
userRouter.patch("/users/:user_id", updateUser);
userRouter.delete("/users/:user_id", deleteUser);

export default userRouter;
