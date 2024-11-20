import Tasks, { type Task } from "../schema";
import type { Session } from "next-auth";

export default async function AppendTask({
  task,
  session,
}: {
  task: Task;
  session: Session;
}) {
  const task_result = await Tasks.findOneAndUpdate(
    { email: session?.user?.email },
    { $push: { tasks: task } }
  );

  return task_result;
}
