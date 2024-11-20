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
import { useModalTask } from "../../hooks";

import { ClipboardList, Plus } from "lucide-react";
import Link from "next/link";
import type { Task } from "@/db/task/schema";

export default function NavTasks({ tasks }: { tasks: Task[] }) {
  const { handleModalTasks } = useModalTask();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tasks</SidebarGroupLabel>
      <SidebarGroupAction onClick={handleModalTasks} title="Add Project">
        <Plus /> <span className="sr-only">Add Task</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks?.map((task) => (
            <SidebarMenuItem key={task._id}>
              <SidebarMenuButton asChild>
                <Link href={`/todo/tasks/${task._id}`}>
                  <ClipboardList />
                  <span>{task.title}</span>
                </Link>
              </SidebarMenuButton>
              {/* <SidebarMenuBadge>3</SidebarMenuBadge> */}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
