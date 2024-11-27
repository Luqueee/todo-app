"use client";

import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import type { Task } from "@/db/task/schema";
import { format } from "date-fns";
import { useModal } from "@/app/todo/hooks";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "./context-menu";
import MenuActionTask from "@/app/todo/tasks/components/ContextMenuActionTask";
//import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  tasks: Task[];
};

//TODO ADD TASKS TO CALENDAR

function Calendar({
  tasks,
  className,
  classNames,
  showOutsideDays = true,

  ...props
}: CalendarProps) {
  const { handleEditTask, handleCreateTaskOnDate } = useModal();

  const tasksForDate = (date: Date) => {
    return tasks?.filter(
      (task) =>
        new Date(task.dueDate as string).getDate() === date.getDate() &&
        new Date(task.dueDate as string).getMonth() === date.getMonth() &&
        new Date(task.dueDate as string).getFullYear() === date.getFullYear()
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full h-full p-0", className)}
      classNames={{
        months: "flex flex-col w-full h-full",
        month: "w-full h-full",
        caption: "flex justify-between items-center h-10 px-4",
        caption_label: "text-xl font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-10 w-10 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        table: "w-full h-[calc(100%-4rem)] border-collapse",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-full font-normal text-base h-16 flex items-center justify-start",
        row: "flex w-full",
        cell: cn(
          "relative p-0 text-center text-base rounded focus-within:relative focus-within:z-20 w-full h-32 [&:has([aria-selected])]:bg-accent flex items-center justify-center",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-full w-14 p-0 font-normal rounded-md aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Day: ({ date }) => {
          const dayTasks = tasksForDate(date);
          return (
            <ContextMenu>
              <ContextMenuTrigger className="border w-full grid grid-rows-[auto_1fr] h-full gap-2 pt-2">
                <Button
                  variant={"ghost"}
                  className="h-auto w-[90%] p-0 mx-auto font-normal"
                  onClick={() => handleCreateTaskOnDate(date)}
                >
                  {format(date, "d")}
                </Button>

                <div className="flex flex-col w-full max-h-full overflow-y-scroll gap-2 px-1 ">
                  {dayTasks?.map((task) => {
                    return (
                      <ContextMenu key={task._id as string}>
                        <ContextMenuTrigger>
                          <Button
                            type="button"
                            onClick={() => handleEditTask(task)}
                            className="border w-full"
                            variant={"secondary"}
                          >
                            <p>{task.title}</p>
                          </Button>
                        </ContextMenuTrigger>
                        <MenuActionTask id={task._id?.toString()} task={task} />
                      </ContextMenu>
                    );
                  })}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem
                  className="w-full"
                  onSelect={() => handleCreateTaskOnDate(date)}
                >
                  Create task
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        },
        IconLeft: () => <ChevronLeft className="h-6 w-6" />,
        IconRight: () => <ChevronRight className="h-6 w-6" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
