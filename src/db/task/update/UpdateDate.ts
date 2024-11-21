"use server";
import { auth } from "@/auth";
import Tasks from "../schema";

export default async function UpdateDate({
  id,
  date,
}: {
  id: string;
  date: Date;
}) {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
      };
    }

    const formatedDate = date.toISOString();

    await Tasks.findOneAndUpdate(
      { email: session?.user?.email, _id: id },
      { $set: { dueDate: formatedDate } }
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
