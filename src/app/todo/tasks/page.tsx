import { FindTasks } from "@/db/task/find";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MenuActionTask from "./components/ContextMenuActionTask";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "date-fns";
import Link from "next/link";

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user) return redirect("/profile/signin");

  const tasksResult = await FindTasks({ session });
  const tasks = tasksResult || [];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <ContextMenu key={task._id}>
            <ContextMenuTrigger>
              <Link href={`/todo/tasks/${task._id}`}>
                <Card className="relative">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{task.description}</p>
                    <p className="absolute top-4 border rounded-lg px-4 py-1 right-4">
                      {formatDate(task.dueDate as string, "MM-dd")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </ContextMenuTrigger>
            <MenuActionTask id={task._id?.toString()} />
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
