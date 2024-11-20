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
import { useToast } from "@/hooks/use-toast";

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
import { createTask } from "./actions";
import { useAction } from "next-safe-action/hooks";
import CalendarField from "./Calendar";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  dueDate: z.date({
    required_error: "A date is required.",
  }),
});
export default function ModalCreateTask() {
  const { toast } = useToast();

  const { execute } = useAction(createTask, {
    onSuccess: (data) => {
      form.reset();

      if (data.data?.success === true) {
        toast({
          title: "Task created successfully",
          description: "Task created successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Task creation failed",
          description: "Task creation failed",
          variant: "destructive",
        });
      }

      setOpen();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const listener = useSelector(
    (state: RootState) => state.tasks.isOpenModalTasks
  );

  useEffect(() => {
    //console.log("listener", listener);
    setIsOpen(store.getState().tasks.isOpenModalTasks);
  }, [listener]);

  const setOpen = () => {
    store.dispatch({ type: "HANDLE_MODAL_TASKS" });
    setIsOpen(store.getState().tasks.isOpenModalTasks);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const date = new Date(values.dueDate).toISOString();

    execute({
      title: values.title,
      description: values.description,
      dueDate: date,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
          <DialogDescription>Fill the mising gaps</DialogDescription>
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
                  <FormControl>
                    <CalendarField {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the description of your task.
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
