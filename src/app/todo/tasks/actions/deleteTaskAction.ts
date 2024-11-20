"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { DeleteTask } from "@/db/task/delete";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
// This schema is used to validate input from client.
const schema = z.object({
  id: z.string(),
});

export const deleteTaskAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await auth();
    const result = await DeleteTask({
      id,
      session,
    });
    revalidatePath("/todo/tasks");

    return result;
  });
