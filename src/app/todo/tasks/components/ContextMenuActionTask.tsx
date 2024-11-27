"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

import { useModal, useTask } from "../../hooks";
import type { Task } from "@/db/task/schema";

interface MenuActionTaskProps {
  id: string | undefined;
  task: Task;
}

export default function MenuActionTask({ id, task }: MenuActionTaskProps) {
  const { handleEditTask } = useModal();

  const { executeDeleteTask } = useTask();

  return (
    <ContextMenuContent className="w-fit">
      {id && (
        <ContextMenuItem
          onSelect={() =>
            executeDeleteTask({
              id,
            })
          }
        >
          Delete
        </ContextMenuItem>
      )}
      <ContextMenuItem onClick={() => handleEditTask(task)}>
        Edit
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
