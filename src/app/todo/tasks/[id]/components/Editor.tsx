"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";

import { Heading } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Button } from "@/components/ui/button";

import useSaveTask from "@/app/todo/hooks/useSaveTask";

export default function Editor({
  id,
  content_initial = "",
}: {
  id: string;
  content_initial?: string;
}) {
  const { setContent, isSaving, content, handleSave } = useSaveTask({
    contentInitial: content_initial,
    id,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false, // Exclude BulletList
        heading: false, // Exclude Heading
      }),
      BulletList.configure({
        itemTypeName: "listItem",
        HTMLAttributes: {
          class: "list-disc pl-8",
        },
      }),
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
      setContent(editor.getHTML());
    },
  });

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
