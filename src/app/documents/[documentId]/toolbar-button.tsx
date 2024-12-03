import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
      onClick={onClick}
      size={"sm"}
      className={cn(
        "h-8 min-w-8 hover:bg-slate-300/80",
        isActive && "bg-slate-200",
      )}
    >
      <Icon className="size-4" />
    </Button>
  );
};

export default ToolbarButton;
