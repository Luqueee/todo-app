"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

import { useAction } from "next-safe-action/hooks";
import { deleteTaskAction } from "../../actions/deleteTaskAction";
import { useToast } from "@/hooks/use-toast";

interface MenuActionTaskProps {
  id: string | undefined;
}

export default function MenuActionTask({ id }: MenuActionTaskProps) {
  const { toast } = useToast();

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
    <ContextMenuContent className="w-64">
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
    </ContextMenuContent>
  );
}
