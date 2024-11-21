"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { DeleteCategory } from "@/db/category/delete";
// This schema is used to validate input from client.
const schema = z.object({
  id: z.string(),
});

export const DeleteCategoryAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    return await DeleteCategory({
      id,
    });
  });
