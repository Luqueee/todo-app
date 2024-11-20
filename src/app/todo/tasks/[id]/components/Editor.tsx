"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";

import { Heading } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { saveFileAction } from "../../actions/saveFileAction";
import { useToast } from "@/hooks/use-toast";

export default function Editor({
  id,
  content_initial = "",
}: {
  id: string;
  content_initial?: string;
}) {
  const [content, setContent] = useState(content_initial);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { execute } = useAction(saveFileAction, {
    onSuccess: (data) => {
      setIsSaving(false);
      console.log(data);
      if (data.data?.success === true) {
        toast({
          title: "Task updated successfully",
          description: "Task updated successfully",
        });
      }

      if (data.data?.success === false) {
        toast({
          title: "Task update failed",
          description: "Task update failed",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      setIsSaving(false);
      toast({
        title: "Task update failed",
        description: "An error occurred while updating the task",
        variant: "destructive",
      });
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      BulletList.configure({
        itemTypeName: "listItem",
        HTMLAttributes: {
          class: "list-disc pl-8",
        },
      }),

      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
        levels: [2],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "p-4 rounded-md border min-h-[200px] focus:border-opacity-10 focus:outline-none",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      //console.log(editor.getHTML());
      setContent(editor.getHTML());
    },
  });

  const handleSave = useCallback(() => {
    if (content === content_initial) {
      toast({
        title: "No changes detected",
        description: "The content is the same as before",
        variant: "default",
      });
      return;
    }

    setIsSaving(true);
    console.log(content);
    execute({ content: content, id: id });
  }, [content, content_initial, id]);

  return (
    <div className="flex flex-col gap-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <Button
        onClick={() => handleSave()}
        className="w-fit"
        variant={"outline"}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
