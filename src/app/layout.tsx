import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Docs Clone",
  description: "Google Docs Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-50")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
