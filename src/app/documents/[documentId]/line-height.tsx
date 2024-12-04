import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ListCollapseIcon } from "lucide-react";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-slate-300/80 px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 flex items-center gap-y-1 z-10 bg-slate-50 rounded-md">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-slate-300/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-slate-300/80",
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LineHeightButton;
