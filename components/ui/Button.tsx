import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "on-band" | "inverse" | "soft";
type Size = "md" | "lg";

// Buttons are UI, so they set in Inter, per the project typography rule.
// Focus styling is global (`:focus-visible` in globals.css) so it can never
// drift between variants or be accidentally dropped from one of them.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-body whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-[var(--ease-soft)] " +
  "disabled:pointer-events-none disabled:opacity-55";

const VARIANT: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-hover hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-hairline-strong bg-transparent text-brand hover:border-brand hover:bg-brand/5 hover:-translate-y-px active:translate-y-0",
  "on-band":
    "border border-white/55 bg-transparent text-on-band hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0",
  // The primary action on a deep-green band. This is a variant rather than a
  // `className` override because two competing text-colour utilities are
  // resolved by Tailwind's own sort order, not by class-string order. An
  // override loses to the base variant and the label renders white on white.
  inverse:
    "bg-white text-[var(--green-800)] hover:bg-white/90 hover:-translate-y-px active:translate-y-0",
  soft: "bg-surface-strong text-on-band-soft hover:bg-brand hover:text-on-brand",
};

const SIZE: Record<Size, string> = {
  // 44px minimum touch target, per the design system.
  md: "min-h-11 px-5 text-[0.875rem] font-semibold",
  lg: "min-h-12 px-6 text-[0.9375rem] font-semibold",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Renders a `Link` when given `href`, a `button` otherwise. Stays a server
 * component so CTAs never cost client JavaScript.
 *
 * Every button tells the custom cursor to show its "Click" label. A caller can
 * override that by passing its own `data-cursor`, which is spread afterwards.
 */
export function Button({ children, variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);

  if (typeof rest.href === "string") {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...cursorIntent("click")} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, "href" | "children">;
  return (
    <button type="button" className={classes} {...cursorIntent("click")} {...buttonProps}>
      {children}
    </button>
  );
}
