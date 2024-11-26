"use client";

import * as React from "react";
import { BookMarked, ClipboardList, Home, Settings, User } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import useModalStore from "@/stores/modalStore";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useModal } from "../hooks";
import type { Task } from "@/db/task/schema";
import type { CategoryType } from "@/db/category/schema";

export function CommandDialogTodo({
  tasks,
  categories,
}: {
  tasks: Task[] | null;
  categories: CategoryType[] | null;
}) {
  const { handleModalTasks, handleModalCategory } = useModal();
  const modalStore = useModalStore(useShallow((state) => state));

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleChange();
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  const setOpenModal = () => {
    modalStore.handleModalIsOpenSearch();
  };

  const handleChange = () => {
    modalStore.handleModalIsOpenSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <CommandDialog
        open={modalStore.isOpenModalSearch}
        onOpenChange={handleChange}
      >
        <DialogTitle className="sr-only">Command</DialogTitle>
        <DialogDescription className="sr-only">Description</DialogDescription>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem asChild>
              <Link
                onClick={handleChange}
                href={"/todo/dashboard"}
                className="w-full flex items-center gap-4 hover:cursor-pointer"
                role="menuitem"
              >
                <Home />
                <span>Home</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link
                onClick={handleChange}
                href={"/todo/tasks"}
                className="w-full flex items-center gap-4 hover:cursor-pointer"
                role="menuitem"
              >
                <ClipboardList />
                <span>Tasks</span>
              </Link>
            </CommandItem>
            <CommandItem
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  setOpenModal();
                  handleModalTasks();
                })
              }
              asChild
            >
              <button
                onClick={() => {
                  setOpenModal();
                  handleModalTasks();
                }}
                type="button"
                className="w-full flex items-center gap-4 hover:cursor-pointer"
                role="menuitem"
              >
                <ClipboardList />
                <span>Create a Task</span>
              </button>
            </CommandItem>
            <CommandItem
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  setOpenModal();
                  handleModalCategory();
                })
              }
              asChild
            >
              <button
                onClick={() => {
                  setOpenModal();
                  handleModalCategory();
                }}
                type="button"
                className="w-full flex items-center gap-4 hover:cursor-pointer"
                role="menuitem"
              >
                <BookMarked />
                <span>Create a Category</span>
              </button>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tasks">
            {tasks?.map((task) => (
              <CommandItem key={task._id as string} asChild>
                <Link
                  href={`/todo/tasks/${task._id}`}
                  onClick={handleChange}
                  role="menuitem"
                  className="hover:cursor-pointer"
                >
                  <ClipboardList />
                  <span>{task.title}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Categories">
            {categories?.map((category) => (
              <CommandItem key={category._id as string} asChild>
                <Link
                  href={`/todo/categories/${category._id}`}
                  onClick={handleChange}
                  role="menuitem"
                  className="hover:cursor-pointer"
                >
                  <BookMarked />
                  <span>{category.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem role="menuitem">
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>

            <CommandItem role="menuitem">
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
