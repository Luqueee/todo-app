"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

import { useAction } from "next-safe-action/hooks";
import { deleteTaskAction } from "../../actions/deleteTaskAction";
import { useToast } from "@/hooks/use-toast";
import { DeleteCategoryAction } from "../../actions/deleteCategoryAction";
import { useDelete } from "../../hooks";

interface MenuActionCateogryProps {
  id: string | undefined;
}

export default function MenuActionCategory({ id }: MenuActionCateogryProps) {
  const { executeCategory } = useDelete();

  return (
    <ContextMenuContent className="w-64">
      {id && (
        <ContextMenuItem
          onSelect={() =>
            executeCategory({
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
