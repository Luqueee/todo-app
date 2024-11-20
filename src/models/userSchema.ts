// Importing mongoose library along with Document and Model types from it
import mongoose, { type Model } from "mongoose";
import { taskSchema, type Task } from "./taskSchema";

export interface User {
  username: string;
  cover: string;
  email: string;
  tasks: Task[];
}

export const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tasks: {
      type: [taskSchema],
      required: false,
      default: [],
      unique: false,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the todo document
const User: Model<User> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
