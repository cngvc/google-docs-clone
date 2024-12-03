import { type Editor } from "@tiptap/react";
import { create } from "zustand";

export type EditorState = {
  editor: Editor | null;
};

export type EditorAction = {
  setEditor: (editor: Editor | null) => void;
};

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
