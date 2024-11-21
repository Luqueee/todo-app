"use server";
import { auth } from "@/auth";
import Categories, { type CategoryType } from "../schema";
import { connectDB } from "@/lib/db";

export default async function GetCategoryById({
  id,
}: {
  id: string;
}): Promise<CategoryType | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  try {
    const categories = await Categories.findOne({
      email: session?.user?.email,
    });

    const categories_result = categories?.categories;

    const category_find = categories_result?.find(
      (category) => category._id?.toString() === id
    );

    if (!category_find) return null;

    return category_find;
  } catch (error) {
    console.error(error);
    return null;
  }
}
