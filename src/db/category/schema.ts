import mongoose, { type ObjectId, type Model } from "mongoose";

export interface CategoriesType {
  username?: string;
  email?: string;
  _id?: ObjectId | string;
  categories: CategoryType[];
}

export interface CategoryType {
  _id?: ObjectId | string | undefined;
  name: string;
  description?: string | undefined;
}

export const categorySchema = new mongoose.Schema<CategoryType>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
});

export const categoriesSchema = new mongoose.Schema<CategoriesType>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  categories: [categorySchema],
});

// Creating a mongoose model for the todo document
const Categories: Model<CategoriesType> =
  mongoose.models?.Categories || mongoose.model("Categories", categoriesSchema);

export default Categories;
