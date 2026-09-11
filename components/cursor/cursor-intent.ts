/**
 * Contextual labels the custom cursor can show over an interactive element.
 *
 * Opt an element in with `{...cursorIntent("view")}` rather than a raw
 * `data-cursor` string, so a typo becomes a type error instead of a label that
 * silently never appears. Safe to use from server components.
 */
export const CURSOR_INTENTS = ["click", "view", "open", "explore", "drag", "play"] as const;

export type CursorIntent = (typeof CURSOR_INTENTS)[number];

export const CURSOR_LABELS: Record<CursorIntent, string> = {
  click: "Click",
  view: "View",
  open: "Open",
  explore: "Explore",
  drag: "Drag",
  play: "Play",
};

export function cursorIntent(intent: CursorIntent) {
  return { "data-cursor": intent } as const;
}

export function isCursorIntent(value: string | undefined): value is CursorIntent {
  return CURSOR_INTENTS.some((intent) => intent === value);
}
