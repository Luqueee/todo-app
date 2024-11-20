"use server";

import { connectDB } from "@/lib/db";
import { auth } from "@/auth";
import { CreateTask } from "./create";
import { AppendTask } from "./append";
import { FindTasks } from "./find";

export async function CreateNewTask({
  task,
}: {
  task: {
    title: string;
    description: string;
    dueDate: string;
    isCompleted?: boolean;
  };
}) {
  // Create a new task.
  // Required fields: title, description, dueDate
  // Optional fields: isCompleted
  // If the task already exists, append the task to the existing tasks.

  const session = await auth();
  if (!session) return undefined;
  await connectDB();

  console.log("createTask", session, task);
  try {
    return await FindTasks({ session: session }).then(async (res) => {
      console.log("FindTasks", res);
      if (res.length === 0) {
        await CreateTask({ task: task, session: session });
        return {
          success: true,
          message: "Task created successfully",
        };
      }

      const result = await AppendTask({ task: task, session: session });

      if (!result) {
        return {
          success: false,
          message: "Task append failed",
        };
      }

      return {
        success: true,
        message: "Task appended successfully",
      };
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Task creation failed",
    };
  }

  //return isTaskCreated;
}
