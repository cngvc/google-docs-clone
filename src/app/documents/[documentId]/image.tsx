import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, $isDialogOpen] = useState(false);
  const [imageUrl, $imageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      $imageUrl("");
      $isDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 min-w-8 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-slate-300/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1.5 flex items-center gap-x-1 z-10 bg-slate-50 rounded-md">
          <DropdownMenuItem
            onClick={onUpload}
            className="hover:!bg-slate-300/80"
          >
            <UploadIcon className="size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => $isDialogOpen(true)}
            className="hover:!bg-slate-300/80"
          >
            <SearchIcon className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={$isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => $imageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ImageButton;
