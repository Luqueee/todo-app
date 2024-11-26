"use client";
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
import { createTaskAction } from "../../../actions/actionCreateTask";
import { useAction } from "next-safe-action/hooks";
import CalendarField from "./Calendar";
import useModalStore from "@/stores/modalStore";
import { useShallow } from "zustand/react/shallow";
import useTaskStore from "@/stores/taskStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import type { CategoryType } from "@/db/category/schema";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date(),
  category: z.string(),
});

export default function ModalCreateTask({
  categories,
}: {
  categories: CategoryType[] | null;
}) {
  const { toast } = useToast();
  const { execute } = useAction(createTaskAction, {
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
  const modalStore = useModalStore(useShallow((state) => state));
  const taskStore = useTaskStore(useShallow((state) => state));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "General",
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    setIsOpen(modalStore.isOpenModalTask);
    if (!modalStore.isOpenModalTask) {
      taskStore.setTask({
        id: "",
        title: "",
        description: "",
        dueDate: new Date() as unknown as string,
        completed: false,
        category: "",
      });
    }
  }, [modalStore]);

  useEffect(() => {
    form.reset({
      title: taskStore.currentTask.title,
      description: taskStore.currentTask.description,
      dueDate: taskStore.currentTask.dueDate
        ? new Date(taskStore.currentTask.dueDate)
        : new Date(),
      category: taskStore.currentTask.category,
    });
  }, [taskStore.currentTask]);

  const setOpen = () => {
    modalStore.handleModalIsOpenTask();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const date = new Date(values.dueDate).toISOString();

    console.log(values);

    execute({
      id: taskStore.currentTask.id,
      title: values.title,
      description: values.description,
      dueDate: date,
      category: values.category,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent title="aaa">
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
          <DialogDescription>Fill the missing gaps</DialogDescription>
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="General">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category._id as string}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
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
