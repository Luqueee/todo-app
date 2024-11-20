"use server";
import { connectDB } from "@/lib/db";
import Tasks from "../schema";
import type { Session } from "next-auth";

export default async function DeleteTask({
  session,
  id,
}: {
  session: Session | null;
  id: string;
}): Promise<{ res: string; success: boolean }> {
  await connectDB();
  if (session) {
    try {
      await Tasks.updateOne(
        { username: session.user?.name },
        { $pull: { tasks: { _id: id } } }
      );
      return {
        res: "success",
        success: true,
      };
    } catch {
      return { res: "error", success: false };
    }
  } else {
    return { res: "error", success: false };
  }
}
