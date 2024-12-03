"use client";

import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import FontFamilyButton from "./font-family";
import HeadingLevelButton from "./heading-level";
import TextColorButton from "./text-color";
import ToolbarButton from "./toolbar-button";

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const cur = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", `${cur == "false"}`);
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => {},
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: false,
        onClick: () => {},
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        isActive: false,
        onClick: () => {},
      },
    ],
  ];

  return (
    <div className="bg-slate-200 px-2.5 py-0.5 rounded-none min-h-12 flex items-center gap-x-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      <FontFamilyButton />

      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      <HeadingLevelButton />

      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      <TextColorButton />

      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-slate-300" />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
