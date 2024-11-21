"use server";

import { auth } from "@/auth";
import Categories from "../schema";
import { revalidatePath } from "next/cache";

export default async function DeleteCategory({ id }: { id: string }) {
  try {
    const session = await auth();

    console.log("Deleting category", id);

    await Categories.updateOne(
      {
        email: session?.user?.email,
      },
      {
        $pull: {
          categories: {
            _id: id,
          },
        },
      }
    );

    revalidatePath("/todo/");

    console.log("Category deleted successfully");
    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.log("Category deletion failed", error);
    return {
      success: false,
      message: "Category deletion failed",
    };
  }
}
