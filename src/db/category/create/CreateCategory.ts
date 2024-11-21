"use server";
import { auth } from "@/auth";
import Categories from "../schema";
import { revalidatePath } from "next/cache";
import FindCategoriesUser from "../find/FindCategories";

export default async function CreateCategory({
  name,
  description = "",
}: {
  name: string;
  description?: string;
}) {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    const { success } = await FindCategoriesUser();

    if (!success) {
      await Categories.create({
        name,
        description,
        email: session?.user?.email,
        username: session?.user?.name,
        categories: [
          {
            name,
            description,
          },
        ],
      });

      console.log("Category created successfully");

      revalidatePath("/todo/");
      return {
        success: true,
        message: "Category created successfully",
      };
    }

    await Categories.updateOne(
      {
        email: session?.user?.email,
      },
      {
        $push: {
          categories: {
            name,
            description,
          },
        },
      }
    );

    revalidatePath("/todo/");

    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      message: "Category creation failed",
    };
  }
}
