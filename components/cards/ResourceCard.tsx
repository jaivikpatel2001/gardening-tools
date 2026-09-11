import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { routes } from "@/lib/routes";
import type { Resource } from "@/types/content";

/**
 * Resource card. Metadata stays deliberately quiet, per the design system; the
 * title and the excerpt do the work.
 */
export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={routes.resource(resource.slug)}
      {...cursorIntent("open")}
      className="group flex h-full w-full flex-col rounded-lg outline-offset-4 transition-transform duration-300 ease-[var(--ease-organic)] hover:-translate-y-1"
    >
      <ImagePlate
        image={resource.image}
        ratio="4/3"
        sizes="(max-width: 743px) 100vw, (max-width: 1127px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col pt-5">
        <p className="flex items-center gap-2.5 text-eyebrow uppercase text-brand-soft">
          {resource.category}
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-hairline-strong" />
          <span className="text-muted">{resource.readingTime}</span>
        </p>

        <h3 className="mt-3 text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{resource.excerpt}</p>
        <ArrowLink asText className="mt-4">
          Read Guide
        </ArrowLink>
      </div>
    </Link>
  );
}
