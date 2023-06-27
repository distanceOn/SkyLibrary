import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import bodyParser from "body-parser";
import cors from "cors";
import bookRouter from "./routes/books.js";

dotenv.config();
const { PORT, API_URL } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
});
