"use client";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import store from "@/redux/store";
import { ClipboardList, Home, Plus } from "lucide-react";
import Link from "next/link";
export default function NavTasks() {
  const handleModalTasks = () => {
    store.dispatch({ type: "HANDLE_MODAL_TASKS" });
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tasks</SidebarGroupLabel>
      <SidebarGroupAction onClick={handleModalTasks} title="Add Project">
        <Plus /> <span className="sr-only">Add Task</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/todo/dashboard">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
            {/* <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" /> */}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button type="button">
                <ClipboardList />
                <span>Tasks</span>
              </button>
            </SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
