"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { AppendContent } from "@/db/task/append";
// This schema is used to validate input from client.
const schema = z.object({
  content: z.string(),
  id: z.string(),
});

export const saveFileAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { content, id } }) => {
    const result = await AppendContent({
      id,
      content,
      session: await auth(),
    });

    revalidatePath("/todo/tasks");

    return result;
  });
