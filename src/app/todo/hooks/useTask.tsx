"use client";

import { createActionCompletedTask } from "@/app/todo/actions/actionUpdateCompletedTask";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hooks";

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

  return {
    executeCompleteTask,
  };
};

export default useTask;
