import Tasks, { type Task } from "../schema";
import type { Session } from "next-auth";

export default async function FindTaskById({
  session,
  id,
}: {
  session: Session;
  id: string;
}): Promise<Task | null | undefined> {
  console.log(id);
  const task = await Tasks.findOne({
    email: session?.user?.email,
  }).lean();

  if (!task) {
    return null;
  }

  return task.tasks.find((task) => task._id?.toString() === id);

  //tood: find task by id
}
