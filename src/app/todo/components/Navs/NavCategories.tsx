"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  //SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useModal } from "../../hooks";

import { BookMarked, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/hooks/use-toast";
import type { CategoryType } from "@/db/category/schema";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { DeleteCategoryAction } from "../../actions/deleteCategoryAction";

export default function NavCategories({
  categories,
}: {
  categories: CategoryType[] | null;
}) {
  const { handleModalCategory } = useModal();
  const { toast } = useToast();

  const { execute } = useAction(DeleteCategoryAction, {
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
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="hover:bg-zinc-800">
            Categories
            <ChevronDown className="ml-auto mr-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <SidebarGroupAction onClick={handleModalCategory} title="Add Project">
          <Plus /> <span className="sr-only">Add Task</span>
        </SidebarGroupAction>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories?.map((category) => (
                <ContextMenu key={category._id as string}>
                  <ContextMenuTrigger>
                    <SidebarMenuItem key={category._id as string}>
                      <SidebarMenuButton asChild>
                        <Link href={`/todo/categories/${category._id}`}>
                          <BookMarked />
                          <span>{category.name}</span>
                        </Link>
                      </SidebarMenuButton>
                      {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
                    </SidebarMenuItem>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem
                      onClick={() =>
                        execute({
                          id: category._id as string,
                        })
                      }
                    >
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
