"use server";

import { FindTasks } from "@/db/task/find";
import CalendarTodo from "../calendar/components/Calendar";

export default async function Dashboard() {
  const tasks = await FindTasks();

  return (
    <div>
      <CalendarTodo tasks_calendar={tasks} />
    </div>
  );
}
