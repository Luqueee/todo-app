"use server";
import { auth } from "@/auth";
import Tasks from "../schema";

export default async function UpdateContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
      };
    }

    await Tasks.findOneAndUpdate(
      { email: session?.user?.email, _id: id },
      { $set: { content: content } }
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
