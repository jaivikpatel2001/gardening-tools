import type { Metadata } from "next";

import { NotFoundView } from "@/components/not-found/NotFoundView";
import { notFoundContent } from "@/data/notFound";

/**
 * The 404 page for every unmatched URL.
 *
 * Rendered inside the root layout, so the header, footer and floating controls
 * all stay available as ways back. Next.js serves it with a 404 status, and it
 * is explicitly `noindex` so a mistyped URL can never be indexed as a page.
 */
export const metadata: Metadata = {
  title: notFoundContent.metaTitle,
  description: notFoundContent.metaDescription,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
