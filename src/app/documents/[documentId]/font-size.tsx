import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, $fontSize] = useState(currentFontSize);
  const [inputValue, $inputValue] = useState(fontSize);
  const [isEditing, $isEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      $fontSize(newSize);
      $inputValue(newSize);
      $isEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $inputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <Button
        onClick={decrement}
        variant={"ghost"}
        className="h-8 w-8 shrink-0 flex items-center justify-center rounded-sm hover:bg-slate-300/80"
      >
        <MinusIcon className="size-4" />
      </Button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-8 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <Button
          onClick={() => {
            $isEditing(true);
            $fontSize(currentFontSize);
          }}
          variant={"ghost"}
          className="h-8 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-slate-300/80"
        >
          {currentFontSize}
        </Button>
      )}
      <Button
        onClick={increment}
        variant={"ghost"}
        className="h-8 w-8 shrink-0 flex items-center justify-center rounded-sm hover:bg-slate-300/80"
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeButton;
