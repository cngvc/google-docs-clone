"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { toast } from "sonner";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();

  const [value, $value] = useState(title);
  const [isPending, $isPending] = useState(false);
  const [isEditing, $isEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    $isPending(true);
    mutate({ id, title: newValue })
      .then(() => toast.success("Document updated"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => $isPending(false));
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    $value(newValue);
    debouncedUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    $isPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document updated");
        $isEditing(false);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => $isPending(false));
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => $isEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            $isEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};

export default DocumentInput;
