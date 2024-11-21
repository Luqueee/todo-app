"use client";

import { useAction } from "next-safe-action/hooks";
import { DeleteCategoryAction } from "../actions/deleteCategoryAction";
import { useToast } from "@/hooks/use-toast";
import { deleteTaskAction } from "../actions/deleteTaskAction";

const useDelete = () => {
  const { toast } = useToast();

  const { execute: executeCategory } = useAction(DeleteCategoryAction, {
    onSuccess: (data) => {
      console.log(data);
      if (data.data?.success === true) {
        toast({
          title: "Category deleted successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Category deletion failed",
        });
      }
    },
  });

  const { execute: executeTask } = useAction(deleteTaskAction, {
    onSuccess: (data) => {
      console.log(data);
      if (data.data?.success === true) {
        toast({
          title: "Task deleted successfully",
          description: "Task deleted successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Task deletion failed",
          description: "Task deletion failed",
        });
      }
    },
  });

  return { executeCategory, executeTask };
};

export default useDelete;
