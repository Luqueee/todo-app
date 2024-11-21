"use server";
import { connectDB } from "@/lib/db";
import Tasks from "../schema";
import type { Session } from "next-auth";

export default async function FindTasks({ session }: { session: Session }) {
  if (!session?.user?.email) {
    throw new Error("Session email is missing");
  }

  await connectDB();

  try {
    const userTasks = await Tasks.find({ email: session.user.email });

    // Format the tasks to match the required structure
    return userTasks?.map((task) => ({
      _id: task._id?.toString(), // Convert ObjectId to string
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate,
      isCompleted: task.isCompleted || false,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
