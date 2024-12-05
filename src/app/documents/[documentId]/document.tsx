"use client";

import { api } from "@convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-slate-50">
        <div className="flex flex-col gap-y-2 fixed top-0 left-0 right-0 z-10 bg-slate-100 print:hidden px-4">
          <Navbar data={document} />
          <Toolbar />
        </div>

        <div className="z-0 pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};

export default Document;
