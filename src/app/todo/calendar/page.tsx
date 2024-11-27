"use server";
import { FindTasks } from "@/db/task/find";
import CalendarTodo from "./components/Calendar";

export default async function CalendarPage() {
  const tasks = await FindTasks();

  return (
    <div className="pr-4 pb-8">
      <CalendarTodo tasks_calendar={tasks} />
    </div>
  );
}
