"use client";

import { useEditor } from "@/editor/use-editor";
import { EditorContent } from "@tiptap/react";
import Ruler from "./ruler";

const Editor = () => {
  const editor = useEditor();

  return (
    <div className="size-full overflow-x-auto overflow-y-visible bg-slate-50 px-4 print:bg-white print:overflow-visible">
      <div className="border-b">
        <Ruler />
      </div>
      <div className="min-w-max flex flex-col items-center h-full w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
