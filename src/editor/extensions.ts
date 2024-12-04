import { FontSizeExtension } from "@/extensions/font-size";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

export const extensions = [
  StarterKit,
  ListItem,
  BulletList,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
  ImageResize,
  Underline,
  FontFamily,
  TextStyle,
  Highlight,
  Color,
  FontSizeExtension,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;
        return !disallowedDomains.includes(domain);
      } catch (error) {
        return false;
      }
    },
  }),
];
