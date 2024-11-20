import mongoose, { type Model } from "mongoose";

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
  content?: string;
}

export const taskSchema = new mongoose.Schema({
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
});

export interface Tasks {
  username: string;
  email?: string;
  tasks: Task[];
}

export const tasksSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: [taskSchema],
});

// Creating a mongoose model for the todo document
const Tasks: Model<Tasks> =
  mongoose.models?.Tasks || mongoose.model("Tasks", tasksSchema);

export default Tasks;
