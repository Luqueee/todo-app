"use server";
import { auth } from "@/auth";
import { FindTaskById } from "@/db/task/find";
import { redirect } from "next/navigation";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";

export default async function Task({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = await auth();

  if (!session?.user) return redirect("/profile/signin");

  const task = await FindTaskById({
    session,
    id,
  });

  console.log(task);

  if (!task) return redirect("/todo/tasks");

  return (
    <div className="flex gap-4 md:lg:flex-row flex-col-reverse">
      <div className="flex-grow">
        <h1 className="text-4xl">{task?.title}</h1>
        <h3>{task?.description}</h3>
        <Editor id={id} content_initial={task?.content} />
      </div>

      <SideBar task={task} />
    </div>
  );
}
