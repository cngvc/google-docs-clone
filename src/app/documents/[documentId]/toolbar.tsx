"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive = true,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      disabled={!isActive}
      onClick={onClick}
      size={"sm"}
      className={cn(
        "h-7 min-w-7 hover:bg-neutral-200/80",
        isActive && "bg-neutral-200",
      )}
    >
      <Icon className="size-4" />
    </Button>
  );
};

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
        onClick: () => {},
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {},
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {},
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => {},
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => {},
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => {},
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {},
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => {},
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => {},
      },
    ],
  ];

  return (
    <div className="bg-slate-200 px-2.5 py-0.5 rounded-none min-h-10 flex items-center gap-x-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
