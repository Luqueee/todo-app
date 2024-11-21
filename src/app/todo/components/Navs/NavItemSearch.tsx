"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import useModalStore from "@/stores/modalStore";
import { Search } from "lucide-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

export default function NavItemSearch() {
  const modalStore = useModalStore(useShallow((state) => state));

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <button
          onClick={() => {
            modalStore.handleModalIsOpenSearch();
          }}
          type="button"
        >
          <Search />
          <span>Search</span>

          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
