"use server";
import mongoose from "mongoose";
import Tasks, { type Task } from "../schema";
import type { Session } from "next-auth";

export default async function CreateTask({
  task,
  session,
}: {
  task: Task;
  session: Session;
}) {
  try {
    console.log("createTask", session, task);
    const newTask = new Tasks(
      {
        username: session?.user?.name,
        email: session?.user?.email,
        tasks: [task],
      },
      {
        onerror: (error: Error) => {
          console.error("Error creating task:", error);
        },
      }
    );
    newTask._id = newTask._id || new mongoose.Types.ObjectId();

    console.log("New task:", newTask);

    await newTask.save();
  } catch (error) {
    console.error("Error creating task:", error);
    return undefined;
  }
}
