import { extensions } from "@/editor/extensions";
import { useEditorStore } from "@/store/use-editor-store";
import { useEditor as useEditorTipTap } from "@tiptap/react";

export const useEditor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditorTipTap({
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
    extensions: extensions,
    content: `
        Hello 1
        Hello 2
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Something</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>  
        <img src="https://placehold.co/800x400" />
    `,
  });

  return editor;
};
