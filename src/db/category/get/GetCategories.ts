"use server";
import Categories, { type CategoryType } from "../schema";
import { connectDB } from "@/lib/db";
import type { Session } from "next-auth";

export default async function GetCategories({
  session,
}: {
  session: Session | null;
}): Promise<CategoryType[] | null> {
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
