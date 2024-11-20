"use server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, ClipboardList } from "lucide-react";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NavUser from "./NavUser";
import NavTasks from "./NavTasks";
import { FindTasks } from "@/db/task/find";
import type { Task } from "@/db/task/schema";

// Menu items.

export async function NavSidebar() {
  const session = await auth();
  //console.log(session);
  if (!session?.user) redirect("/profile/signin");

  const tasks: Task[] = (await FindTasks({ session })) || [];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/todo/dashboard">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/todo/tasks">
                    <ClipboardList />
                    <span>Tasks</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavTasks tasks={tasks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
