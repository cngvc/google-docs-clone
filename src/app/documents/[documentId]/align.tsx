import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      value: "right",
      icon: AlignRightIcon,
    },
    {
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-slate-300/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 flex items-center gap-x-1 z-10 bg-slate-50 rounded-md">
        {alignments.map(({ value, icon: Icon }) => (
          <Button
            key={value}
            variant={"ghost"}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            size={"sm"}
            className={cn(
              "h-8 min-w-8 hover:bg-slate-300/80 px-2",
              editor?.isActive({ textAlign: value }) && "bg-slate-200",
            )}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AlignButton;
