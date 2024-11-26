"use server";
import { connectDB } from "@/lib/db";
import Tasks from "../schema";
import { auth } from "@/auth";
import { z } from "zod";
import { formatDate } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dateSchema = z.date();

export default async function FindTasksByDate({
  date,
}: {
  date: z.infer<typeof dateSchema>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Session email is missing");
  }

  await connectDB();

  try {
    const date_formated = formatDate(date, "yyyy-MM-dd");

    console.log("date_formated", date_formated);

    const userTasks =
      (await Tasks.find({
        email: session.user.email,
        dueDate: date_formated,
      })) || [];
    // Format the tasks to match the required structure
    return userTasks?.map((task) => ({
      _id: task._id?.toString(), // Convert ObjectId to string
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate,
      isCompleted: task.isCompleted || false,
      category: task.category || "General",
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
