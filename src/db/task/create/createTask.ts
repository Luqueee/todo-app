"use server";
import mongoose from "mongoose";
import Tasks, { type Task } from "../schema";
import { auth } from "@/auth";
import { formatDate } from "date-fns";

export default async function CreateNewTask({ task }: { task: Task }) {
  try {
    const session = await auth();

    if (task._id !== "") {
      const existingTask = await Tasks.findOne({ _id: task._id });

      const formattedDate = formatDate(task.dueDate as string, "yyyy-MM-dd");

      console.log("existingTask", formattedDate);

      if (existingTask) {
        existingTask.title = task.title;
        existingTask.description = task.description || "";
        existingTask.dueDate = formattedDate;
        existingTask.isCompleted = task?.isCompleted || false;
        existingTask.content = task?.content || "";
        existingTask.category = task?.category || "General";
        await existingTask.save();

        return {
          success: true,
          message: "Task updated successfully",
        };
      }
    }

    const formattedDate = formatDate(task.dueDate as string, "yyyy-MM-dd");

    console.log("existingTask", formattedDate);

    const newTask = new Tasks(
      {
        username: session?.user?.name,
        email: session?.user?.email,
        title: task.title,
        description: task.description || "",
        dueDate: formattedDate,
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
