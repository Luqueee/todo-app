import mongoose, { type ObjectId, type Model } from "mongoose";

export interface Task {
  _id?: ObjectId | string;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
  content?: string;
  category?: string;
}

export interface TasksType extends Task {
  username?: string;
  email?: string;
}

export const tasksSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
    default: "",
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  category: {
    type: String,
    required: false,
    default: "General",
  },
});

// Creating a mongoose model for the todo document
const Tasks: Model<TasksType> =
  mongoose.models?.Tasks || mongoose.model("Tasks", tasksSchema);

export default Tasks;
