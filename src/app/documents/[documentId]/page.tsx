import FullscreenLoader from "@/components/ui/fullscreen-loader";
import { auth } from "@clerk/nextjs/server";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { Suspense } from "react";
import Document from "./document";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token },
  );

  return (
    <Suspense fallback={<FullscreenLoader />}>
      <Document preloadedDocument={preloadedDocument} />
    </Suspense>
  );
};

export default DocumentIdPage;
