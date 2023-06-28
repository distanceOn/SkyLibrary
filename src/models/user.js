import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  books: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
