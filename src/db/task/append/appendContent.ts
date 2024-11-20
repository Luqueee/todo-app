import { connectDB } from "@/lib/db";
import type { Session } from "next-auth";
import Tasks from "../schema";

export default async function AppendContent({
  id,
  content,
  session,
}: {
  id: string;
  content: string;
  session: Session | null;
}) {
  try {
    await connectDB();

    const task = await Tasks.findOne({
      "tasks._id": id,
      email: session?.user?.email,
    });

    if (!task || !task.tasks) {
      throw new Error("Task not found");
    }

    const updatedTasks = task.tasks.map((task) => {
      if (task._id?.toString() === id) {
        task.content = content;
      }
      return task;
    });

    await Tasks.updateOne(
      { "tasks._id": id },
      { $set: { tasks: updatedTasks } }
    );

    console.log("Content appended to task:", id);
    return {
      success: true,
      message: "Content appended successfully",
    };
  } catch (error) {
    console.error("Error appending content to task:", error);
    return {
      success: false,
      message: "Content append failed",
    };
  }
}
