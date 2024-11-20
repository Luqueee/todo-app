"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import store from "@/redux/store";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  dueDate: z.string(),
});
export default function ModalCreateTask() {
  const [isOpen, setIsOpen] = useState(false);

  const listener = useSelector(
    (state: RootState) => state.tasks.isOpenModalTasks
  );

  const handleOpen = () => {
    //console.log("handleOpen", store.getState().isOpenModalTasks);
    setIsOpen(store.getState().tasks.isOpenModalTasks);
  };

  useEffect(() => {
    handleOpen();
  }, [listener]);

  const setOpen = () => {
    store.dispatch({ type: "HANDLE_MODAL_TASKS" });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    fetch("/api/todo/tasks", {
      method: "POST",
      body: JSON.stringify(values),
    }).then(async (res) => {
      const req = await res.json();
      console.log(req);
      form.reset();
      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of your task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the description of your task.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!Number.isNaN(date.getTime())) {
                          field.onChange(date.toISOString().split("T")[0]);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
