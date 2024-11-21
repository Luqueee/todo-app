"use server";

import { GetCategoryById } from "@/db/category/get";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  console.log("id", id);

  const category = await GetCategoryById({ id });

  console.log("category", category);

  if (!category) return <div>Category not found</div>;

  return (
    <div>
      <h1>{category.name}</h1>
    </div>
  );
}
