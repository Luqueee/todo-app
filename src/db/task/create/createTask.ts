"use server";
import mongoose from "mongoose";
import Tasks, { type Task } from "../schema";
import { auth } from "@/auth";

export default async function CreateNewTask({ task }: { task: Task }) {
  try {
    const session = await auth();

    console.log("createTask", session, task);
    const newTask = new Tasks(
      {
        username: session?.user?.name,
        email: session?.user?.email,
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate,
        isCompleted: task?.isCompleted || false,
        content: task?.content || "",
        category: task?.category || "General",
      },
      {
        onerror: (error: Error) => {
          console.error("Error creating task:", error);
        },
      }
    );
    newTask._id =
      newTask._id || (new mongoose.Types.ObjectId() as unknown as string);

    await newTask.save();

    return {
      success: true,
      message: "Task created successfully",
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Task creation failed",
    };
  }
}
