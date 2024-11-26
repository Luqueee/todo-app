"use client";

import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

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
