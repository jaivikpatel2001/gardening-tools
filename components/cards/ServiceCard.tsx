import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { routes } from "@/lib/routes";
import type { Service } from "@/types/content";

/**
 * Service card. The circular icon badge straddles the image edge, which is the
 * design system's organic-geometry cue. It is decorative; the heading carries
 * the meaning.
 */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={routes.service(service.slug)}
      {...cursorIntent("open")}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline-soft bg-surface shadow-card outline-offset-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
    >
      <div className="relative">
        <ImagePlate
          image={service.image}
          ratio="16/10"
          radius="none"
          sizes="(max-width: 743px) 100vw, (max-width: 1127px) 50vw, 25vw"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-6 left-5 grid h-12 w-12 place-items-center rounded-full bg-brand text-on-brand shadow-card transition-colors duration-300 group-hover:bg-brand-hover"
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-9">
        <h3 className="text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{service.description}</p>
        <ArrowLink asText className="mt-5">
          Learn More
        </ArrowLink>
      </div>
    </Link>
  );
}
