"use client";
import type { Task } from "@/db/task/schema";

import { useEffect, useState } from "react";
import DateForm from "./DateForm";
import { useTask } from "@/app/todo/hooks";

export default function SideBar({ task }: { task: Task }) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const { executeCompleteTask } = useTask();

  useEffect(() => {
    setIsCompleted(task.isCompleted);
  }, [task.isCompleted]);

  return (
    <div className="border rounded-lg p-4 md:lg:w-[250px] flex flex-col gap-4 w-full">
      <div>
        <button
          onClick={() =>
            executeCompleteTask({
              id: task._id as string,
              isCompleted: !isCompleted,
            })
          }
          type="button"
          className="w-full h-fit border flex items-center transition-all gap-4 p-2 rounded-lg"
        >
          <div
            className="w-6 h-6 rounded-full border transition-all duration-300"
            style={{ backgroundColor: isCompleted ? "#77a345" : "" }}
          />
          {isCompleted ? "Completed" : "Mark as completed"}
        </button>
      </div>
      {task?.dueDate && (
        <DateForm date={task?.dueDate} id={task._id as string} />
      )}
    </div>
  );
}
