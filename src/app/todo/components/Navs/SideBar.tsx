"use server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, ClipboardList } from "lucide-react";

import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import NavUser from "./NavUser";
import NavTasks from "./NavTasks";
import { FindTasks } from "@/db/task/find";
import { GetCategories } from "@/db/category/get";
import NavCategories from "./NavCategories";
import NavItemSearch from "./NavItemSearch";
import { CommandDialogTodo } from "../CommandTodo";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export async function NavSidebar() {
  const session = await auth();
  //console.log(session);
  if (!session?.user) redirect("/profile/signin");

  const tasks = (await FindTasks()) || [];
  const categories = (await GetCategories()) || [];

  return (
    <>
      <CommandDialogTodo tasks={tasks} categories={categories} />
      <Sidebar variant="floating" collapsible="icon" title="holaaa">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menus</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItemSearch />
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
                    <Link href="/todo/tasks">
                      <ClipboardList />
                      <span>Tasks</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{tasks.length}</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/todo/categories">
                      <ClipboardList />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{categories.length}</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <NavTasks tasks={tasks} />
          <NavCategories categories={categories} />
        </SidebarContent>
        <SidebarFooter title="holaa">
          <NavUser session={session}>
            <DropdownMenuItem asChild className="p-0">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="w-full h-full"
              >
                <button type="submit" className="w-full h-full flex py-2 px-2">
                  Signout
                </button>
              </form>
            </DropdownMenuItem>
          </NavUser>
        </SidebarFooter>
        {/* <SidebarRail /> */}
      </Sidebar>
    </>
  );
}
