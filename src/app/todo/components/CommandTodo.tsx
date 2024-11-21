"use client";

import * as React from "react";
import {
  Book,
  BookMarked,
  Calculator,
  Calendar,
  ClipboardList,
  CreditCard,
  Home,
  Settings,
  Smile,
  User,
} from "lucide-react";

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

export function CommandDialogTodo() {
  const [open, setOpen] = React.useState(false);
  const { handleModalTasks, handleModalCategory } = useModal();
  const modalStore = useModalStore(useShallow((state) => state));

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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

  React.useEffect(() => {
    setOpen(modalStore.isOpenModalSearch);
  }, [modalStore]);

  const handleChange = (value: boolean) => {
    setOpen(value);
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
      <CommandDialog open={open} onOpenChange={handleChange}>
        <DialogTitle className="sr-only">Command</DialogTitle>
        <DialogDescription className="sr-only">Description</DialogDescription>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem asChild>
              <Link
                onClick={setOpenModal}
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
                onClick={setOpenModal}
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
            >
              <button
                onClick={() => {
                  setOpenModal();
                  handleModalTasks();
                }}
                type="button"
                className="w-full flex items-center gap-4"
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
            >
              <button
                onClick={() => {
                  setOpenModal();
                  handleModalCategory();
                }}
                type="button"
                className="w-full flex items-center gap-4"
                role="menuitem"
              >
                <BookMarked />
                <span>Create a Category</span>
              </button>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem role="menuitem">
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem role="menuitem">
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
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
