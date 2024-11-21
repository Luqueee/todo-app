"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { CreateCategory } from "@/db/category/create";
// This schema is used to validate input from client.
const schema = z.object({
  name: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

export const createCategoryAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, description } }) => {
    console.log("name", name, description);
    return await CreateCategory({
      name: name,
      description: description || "",
    });
  });
