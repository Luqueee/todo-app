"use client";
import { Calendar } from "@/components/ui/calendarTodo";
import { formatDate } from "date-fns";
import { useState } from "react";
import { createFindTaskAction } from "../../actions/actionFindTasksByDate";
import { useAction } from "next-safe-action/hooks";

export default function CalendarTodo() {
  const [value, setValue] = useState<Date | null>(null);
  const [valueFormated, setValueFormated] = useState<string | null>(null);

  const { execute, result } = useAction(createFindTaskAction, {
    // onSuccess: (data) => {
    // },
  });

  const onChange = (date: unknown) => {
    if (date) {
      setValue(date as unknown as Date);
      const dateResult = formatDate(date as Date, "yyyy-MM-dd");
      setValueFormated(dateResult);
      execute({ date: date as Date });
    }
  };

  return (
    <div className="grid grid-cols-1 md:lg:grid-cols-[auto_1fr] gap-4">
      <Calendar
        mode="single"
        selected={value || new Date()}
        onSelect={onChange}
        initialFocus
        className="select-none"
      />
      <div className="p-4 border w-full h-fit rounded-lg">
        <p>{valueFormated}</p>

        <div>
          {result.data?.map((task) => {
            console.log(task);
            return (
              <div key={task._id as string}>
                <p>
                  {task.title} -{" "}
                  {formatDate(task.dueDate as string, "yyyy-MM-dd")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
