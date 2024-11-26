"use server";
import { auth } from "@/auth";
import Categories, { type CategoryType } from "../schema";
import { connectDB } from "@/lib/db";

export default async function GetCategories(): Promise<CategoryType[] | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  await connectDB();

  try {
    const categories = await Categories.findOne({
      email: session?.user?.email,
    });

    const categories_result = categories?.categories;
    if (!categories_result) return null;

    categories_result.push({
      name: "General",
      description: "General",
    });

    categories_result.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return categories_result?.map((category) => ({
      _id: category._id?.toString(),
      name: category.name,
      description: category.description,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
