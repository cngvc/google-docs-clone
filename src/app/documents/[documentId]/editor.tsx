"use client";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { extensions } from "@/editor/extensions";
import { useEditorStore } from "@/store/use-editor-store";
import { useStorage } from "@liveblocks/react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { EditorContent, useEditor } from "@tiptap/react";
import Ruler from "./ruler";
import Threads from "./threads";

interface EditorProps {
  initialContent?: string | undefined;
}

const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const { setEditor } = useEditorStore();
  const editor = useEditor({
    autofocus: true,
    immediatelyRender: false,
    onCreate(props) {
      setEditor(props.editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate(props) {
      setEditor(props.editor);
    },
    onSelectionUpdate(props) {
      setEditor(props.editor);
    },
    onTransaction(props) {
      setEditor(props.editor);
    },
    onFocus(props) {
      setEditor(props.editor);
    },
    onBlur(props) {
      setEditor(props.editor);
    },
    onContentError(props) {
      setEditor(props.editor);
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none print:border-0 bg-white border border-gray-100 flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text",
        style: "padding-left: 56px; padding-right: 56px",
      },
    },
    extensions: [...extensions, liveblocks],
  });

  return (
    <div className="size-full overflow-x-auto overflow-y-visible bg-slate-50 px-4 print:bg-white print:overflow-visible">
      <div className="border-b">
        <Ruler />
      </div>
      <div className="min-w-max flex flex-col items-center h-full w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
