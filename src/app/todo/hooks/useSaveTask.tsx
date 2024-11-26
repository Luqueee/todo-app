"use client";

import { useAction } from "next-safe-action/hooks";
import { saveFileAction } from "@/app/todo/actions/saveFileAction";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDebouncedSync } from "@/hooks/useDebounceSync";

const useSaveTask = ({
  contentInitial = "",
  id,
}: {
  contentInitial?: string;
  id: string;
}) => {
  const [content, setContent] = useState(contentInitial);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { execute } = useAction(saveFileAction, {
    onSuccess: (data) => {
      setIsSaving(false);
      console.log(data);
      if (data.data?.success === true) {
        toast({
          title: "Task updated successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Task update failed",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      setIsSaving(false);
      toast({
        title: "Task update failed",
        variant: "destructive",
      });
    },
  });

  const handleSave = useCallback(() => {
    if (content === contentInitial) {
      toast({
        title: "No changes detected",
        variant: "default",
      });
      return;
    }

    setIsSaving(true);
    execute({ content: content, id: id });
  }, [content, contentInitial, id]);

  useDebouncedSync(content, handleSave, 1000);

  return {
    content,
    setContent,
    isSaving,
    setIsSaving,
    handleSave,
    execute,
  };
};

export default useSaveTask;
