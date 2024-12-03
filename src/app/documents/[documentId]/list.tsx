import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ListIcon, ListOrderedIcon } from "lucide-react";

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-slate-300/80 px-1.5 overflow-hidden text-sm">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 flex items-center gap-x-1 z-10 bg-slate-50 rounded-md">
        {lists.map(({ icon: Icon, onClick, isActive }, index) => (
          <Button
            key={index}
            variant={"ghost"}
            onClick={onClick}
            size={"sm"}
            className={cn(
              "h-8 min-w-8 hover:bg-slate-300/80 px-2",
              isActive() && "bg-slate-200",
            )}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListButton;
