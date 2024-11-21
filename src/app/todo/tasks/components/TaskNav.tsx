"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "../../hooks";

export default function TaskNav() {
  const { handleModalTasks, handleModalCategory } = useModal();

  return (
    <div className="flex gap-4 ">
      <Button variant={"outline"} onClick={handleModalTasks} type="button">
        Create task
      </Button>
      <Button variant={"outline"} onClick={handleModalCategory} type="button">
        Create category
      </Button>
    </div>
  );
}
