import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Link2Icon } from "lucide-react";
import { useState } from "react";

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, $value] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    $value("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          $value(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-slate-300/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1.5 flex items-center gap-x-2 z-10 bg-slate-50 rounded-md">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => $value(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkButton;
