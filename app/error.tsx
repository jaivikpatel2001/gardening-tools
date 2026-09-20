"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { errorContent } from "@/data/errorPage";

/**
 * The route error boundary.
 *
 * Next.js renders this in place of the page when a route throws, with the root
 * layout still around it, so the header, the products menu and the footer stay
 * available as ways out. Error boundaries have to be client components.
 *
 * Deliberately spare. Next.js serialises this boundary into every route so it
 * can render without a round trip, exactly as it does with `not-found`, which
 * means everything it imports becomes client JavaScript on every page of the
 * site. It reuses `Button` and `Eyebrow` so it still looks like the rest of the
 * site, and stops there: the illustration, the arrow links and the phone number
 * from `config/site` were all tried here and each one pulled another module
 * across the boundary for a page almost nobody sees. The 404 page earns its
 * illustration because visitors actually reach it. This one should not.
 *
 * `retry` is Next 16's name for the re-render callback. It replaced `reset`.
 */
export default function RouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // No error reporting service is wired up, so the console is the only record
    // there is. The digest is what identifies this failure in the server logs.
    console.error(error);
  }, [error]);

  return (
    <section
      aria-labelledby="route-error-heading"
      className="relative isolate overflow-hidden bg-canvas"
    >
      <div className="container-page flex min-h-[min(70svh,640px)] items-center py-24 lg:py-32">
        <div className="max-w-xl">
          <Eyebrow>{errorContent.eyebrow}</Eyebrow>

          <h1 id="route-error-heading" className="mt-6 text-display-lg text-ink">
            {errorContent.heading}
          </h1>

          <p className="mt-6 max-w-md text-body-lg text-body">{errorContent.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button type="button" size="lg" onClick={() => retry()}>
              {errorContent.retryLabel}
            </Button>

            <Button href={errorContent.homeCta.href} variant="secondary" size="lg">
              {errorContent.homeCta.label}
            </Button>
          </div>

          <p className="mt-12 border-t border-hairline pt-6 text-body-sm text-muted">
            {errorContent.helpLabel}{" "}
            <Link
              href={errorContent.contactCta.href}
              className="text-brand underline underline-offset-4 transition-colors duration-200 hover:text-brand-hover"
            >
              {errorContent.contactCta.label}
            </Link>
          </p>

          {error.digest ? (
            <p className="mt-6 text-caption-sm text-muted">Reference: {error.digest}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
