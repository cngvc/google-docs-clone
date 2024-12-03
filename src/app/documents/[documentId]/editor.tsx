"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";

import { EditorContent, useEditor } from "@tiptap/react";
import ImageResize from "tiptap-extension-resize-image";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none print:border-0 bg-white border border-gray-100 flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text",
        style: "padding-left: 56px; padding-right: 56px",
      },
    },
    extensions: [
      StarterKit,
      ListItem,
      BulletList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      Image,
      ImageResize,
    ],
    content: `
    <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>  

        <img src="https://placehold.co/800x400" />

    `,
  });

  return (
    <div className="size-full overflow-x-auto bg-slate-50 px-4 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
