"use server";

import { auth } from "@/auth";
import { GetCategories } from "@/db/category/get";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import Link from "next/link";
import MenuActionTask from "../tasks/components/ContextMenuActionTask";
import MenuActionCategory from "./components/ContextMenuActionCategory";
export default async function CategoriesPage() {
  const session = await auth();

  const categories = await GetCategories({
    session,
  });

  console.log("categories", categories);

  return (
    <div>
      <h1>Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories?.map((category) => (
          <ContextMenu key={category._id as string}>
            <ContextMenuTrigger>
              <Link href={`/todo/categories/${category._id}`}>
                <Card className="min-h-24">
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </ContextMenuTrigger>
            <MenuActionCategory id={category._id?.toString()} />
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
