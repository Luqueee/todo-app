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
import { useDelete, useModal } from "../../hooks";

import { ChevronDown, ClipboardList, Plus } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/db/task/schema";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useAction } from "next-safe-action/hooks";
import { deleteTaskAction } from "../../actions/deleteTaskAction";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useTaskStore from "@/stores/taskStore";
import { useShallow } from "zustand/react/shallow";
import { ContextMenuLabel } from "@radix-ui/react-context-menu";

export default function NavTasks({ tasks }: { tasks: Task[] }) {
  const { handleModalTasks } = useModal();
  const { executeTask } = useDelete();
  const taskStore = useTaskStore((state) => state);

  const handleEditTask = (task: Task) => {
    taskStore.setTask({
      id: task._id as string,
      title: task.title,
      description: task.description ?? "",
      dueDate: task.dueDate,
      completed: task.isCompleted as boolean,
      category: task.category as string,
    });
    handleModalTasks();
  };

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="hover:bg-zinc-800">
            Tasks
            <ChevronDown className="ml-auto mr-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <SidebarGroupAction onClick={handleModalTasks} title="Add Project">
          <Plus /> <span className="sr-only">Add Task</span>
        </SidebarGroupAction>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {tasks?.map((task) => (
                <ContextMenu key={task._id as string}>
                  <ContextMenuTrigger>
                    <SidebarMenuItem key={task._id as string}>
                      <SidebarMenuButton asChild>
                        <Link href={`/todo/tasks/${task._id}`}>
                          <ClipboardList />
                          <span>{task.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
                    </SidebarMenuItem>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-fit">
                    <ContextMenuItem
                      onClick={() =>
                        executeTask({
                          id: task._id as string,
                        })
                      }
                    >
                      Delete
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleEditTask(task)}>
                      Edit
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
