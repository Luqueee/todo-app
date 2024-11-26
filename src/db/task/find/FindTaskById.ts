import Tasks, { type Task } from "../schema";
import type { Session } from "next-auth";

export default async function FindTaskById({
  session,
  id,
}: {
  session: Session;
  id: string;
}): Promise<Task | null> {
  try {
    const task = await Tasks.findOne({
      email: session?.user?.email,
      _id: id,
    }).lean();

    if (!task) {
      return null;
    }

    return {
      _id: task._id?.toString(),
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate,
      isCompleted: task.isCompleted || false,
      content: task.content || "",
    };

    //tood: find task by id
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}
