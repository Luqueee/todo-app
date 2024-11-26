"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

import { useAction } from "next-safe-action/hooks";
import { deleteTaskAction } from "../../actions/deleteTaskAction";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "../../hooks";
import type { Task } from "@/db/task/schema";

interface MenuActionTaskProps {
  id: string | undefined;
  task: Task;
}

export default function MenuActionTask({ id, task }: MenuActionTaskProps) {
  const { toast } = useToast();
  const { handleEditTask } = useModal();

  const { execute } = useAction(deleteTaskAction, {
    onSuccess: (data) => {
      console.log(data);
      if (data.data?.success === true) {
        toast({
          title: "Task deleted successfully",
          description: "Task deleted successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Task deletion failed",
          description: "Task deletion failed",
        });
      }
    },
  });

  return (
    <ContextMenuContent className="w-fit">
      {id && (
        <ContextMenuItem
          onSelect={() =>
            execute({
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
