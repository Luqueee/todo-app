"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { UpdateCompleted } from "@/db/task/update";
// This schema is used to validate input from client.
const schema = z.object({
  isCompleted: z.boolean(),
  id: z.string(),
});

export const createActionCompletedTask = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { isCompleted, id } }) => {
    const result = await UpdateCompleted({
      id: id,
      completed: isCompleted,
    });

    revalidatePath("/todo/");

    return result;
  });
