"use client";

import { createActionCompletedTask } from "@/app/todo/actions/actionUpdateCompletedTask";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";
import { deleteTaskAction } from "../actions/deleteTaskAction";

const useTask = () => {
  const { toast } = useToast();

  const { execute: executeCompleteTask } = useAction(
    createActionCompletedTask,
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.data?.success === true) {
          toast({
            title: "Task updated successfully",
          });
        }

        if (data.data?.success === false) {
          toast({
            title: "Task update failed",
          });
        }
      },
    }
  );

  const { execute: executeDeleteTask } = useAction(deleteTaskAction, {
    onSuccess: (data) => {
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

  return {
    executeCompleteTask,
    executeDeleteTask,
  };
};

export default useTask;
