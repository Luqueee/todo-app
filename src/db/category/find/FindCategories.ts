import { auth } from "@/auth";
import Categories from "../schema";

export default async function FindCategoriesUser(): Promise<{
  success: boolean;
}> {
  const session = await auth();

  if (!session) {
    return {
      success: false,
    };
  }

  const existingCategory = await Categories.findOne({
    email: session?.user?.email,
  });

  if (!existingCategory) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
