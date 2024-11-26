"use server";
import { auth } from "@/auth";
import Tasks from "../schema";

export default async function UpdateCompleted({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
      };
    }

    console.log(session?.user?.email, id, completed);

    await Tasks.findOneAndUpdate(
      { email: session?.user?.email, _id: id },
      { $set: { isCompleted: completed } }
    );
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}
