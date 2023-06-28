import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import bodyParser from "body-parser";
import cors from "cors";
import bookRouter from "./routes/books.js";
import logOriginalUrl from "./middlewares/log.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://distanceon:vfrfrf@library.32uysdl.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    dotenv.config();
    const { PORT, API_URL } = process.env;

    const app = express();

    app.use(cors());
    app.use(logOriginalUrl);
    app.use(bodyParser.json());
    app.use(userRouter);
    app.use(bookRouter);

    app.listen(PORT, () => {
      console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
})();
