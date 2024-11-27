"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { CreateNewTask } from "@/db/task/create";
import { revalidatePath } from "next/cache";
// This schema is used to validate input from client.
const schema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.string(),
  id: z.string().optional(),
  category: z.string(),
});

export const createTaskAction = actionClient
  .schema(schema)
  .action(
    async ({ parsedInput: { title, description, dueDate, id, category } }) => {
      const result = await CreateNewTask({
        task: {
          _id: id,
          title,
          description,
          dueDate,
          category,
        },
      });

      revalidatePath("/todo/");

      return result;
    }
  );
