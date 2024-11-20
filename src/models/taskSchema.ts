import mongoose from "mongoose";

export interface Task {
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted?: boolean;
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
    required: false,
  },
  isCompleted: {
    type: Boolean,
    required: false,
  },
});
