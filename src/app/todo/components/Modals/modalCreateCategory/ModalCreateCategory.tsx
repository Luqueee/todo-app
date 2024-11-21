"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { useAction } from "next-safe-action/hooks";
import useModalStore from "@/stores/modalStore";
import { useShallow } from "zustand/react/shallow";
import { createCategoryAction } from "@/app/todo/actions/actionCreateCategory";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});
export default function ModalCreateCategory() {
  const { toast } = useToast();

  const { execute } = useAction(createCategoryAction, {
    onSuccess: (data) => {
      form.reset();

      if (data.data?.success === true) {
        toast({
          title: "Category created successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Category creation failed",
          variant: "destructive",
        });
      }

      setOpen();
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const modalStore = useModalStore(useShallow((state) => state));

  useEffect(() => {
    setIsOpen(modalStore.isOpenModalCategory);
  }, [modalStore]);

  const setOpen = () => {
    modalStore.handleModalIsOpenCategory();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    execute({
      name: values.name,
      description: values.description,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Category</DialogTitle>
          <DialogDescription>Fill the mising gaps</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the Name of your category.
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
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the description of your category.
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
