"use client";

import { Button } from "@/components/ui/button";
import { useModalTask } from "../../hooks";

export default function TaskNav() {
  const { handleModalTasks } = useModalTask();

  return (
    <div className="flex flex-col gap-4 w-fit">
      <Button variant={"outline"} onClick={handleModalTasks} type="button">
        Create task
      </Button>
    </div>
  );
}
