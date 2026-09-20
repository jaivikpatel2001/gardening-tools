"use client";

import { BRAND_COLORS } from "@/config/brand";
import { globalErrorContent } from "@/data/errorPage";

/**
 * The root error boundary.
 *
 * This one only runs when the root layout itself fails, which means it replaces
 * the layout rather than rendering inside it. It has to supply its own `<html>`
 * and `<body>`, and it cannot rely on anything the layout sets up: not the
 * theme script, not the font variables, not the design tokens in `globals.css`.
 *
 * So it is styled inline from `config/brand.ts` and uses system fonts. Anything
 * else would be a second thing that can fail at the exact moment the first one
 * already has. There is no header and no footer here, so the two links are the
 * only way out and both are plain anchors rather than `Link`: the router is
 * part of what may have broken.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "2rem 1.5rem",
          backgroundColor: BRAND_COLORS.canvas,
          color: "#1B2A1F",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <main style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: BRAND_COLORS.primary,
            }}
          >
            {globalErrorContent.title}
          </p>

          <h1 style={{ margin: "1rem 0 0", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700 }}>
            {globalErrorContent.heading}
          </h1>

          <p style={{ margin: "1rem 0 0", fontSize: "1.0625rem", opacity: 0.8 }}>
            {globalErrorContent.body}
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                minHeight: "3rem",
                padding: "0 1.5rem",
                border: 0,
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 600,
                fontFamily: "inherit",
                backgroundColor: BRAND_COLORS.primary,
                color: BRAND_COLORS.onPrimary,
              }}
            >
              {globalErrorContent.retryLabel}
            </button>

            {/* A plain anchor on purpose. `Link` would navigate on the client
                and re-render the same tree that just failed; a full document
                load is the thing most likely to actually recover. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                minHeight: "3rem",
                padding: "0 1.5rem",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "0.5rem",
                border: "1px solid rgba(27, 42, 31, 0.25)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                color: BRAND_COLORS.primary,
              }}
            >
              {globalErrorContent.homeLabel}
            </a>
          </div>

          {error.digest ? (
            <p style={{ marginTop: "2rem", fontSize: "0.8125rem", opacity: 0.6 }}>
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
