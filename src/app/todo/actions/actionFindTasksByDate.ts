"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { FindTasksByDate } from "@/db/task/find";
// This schema is used to validate input from client.
const schema = z.object({
  date: z.date(),
});

export const createFindTaskAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { date } }) => {
    const result = await FindTasksByDate({
      date: new Date(date),
    });

    return result;
  });
