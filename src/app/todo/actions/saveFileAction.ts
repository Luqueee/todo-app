"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { UpdateContent } from "@/db/task/update";
// This schema is used to validate input from client.
const schema = z.object({
  content: z.string(),
  id: z.string(),
});

export const saveFileAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { content, id } }) => {
    const result = await UpdateContent({
      id,
      content,
    });

    revalidatePath("/todo/tasks");

    return result;
  });
