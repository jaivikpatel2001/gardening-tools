type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class joiner. Deliberately not `clsx` + `tailwind-merge`: this
 * codebase composes variants from explicit maps rather than overriding
 * conflicting utilities, so conflict resolution is not needed and the
 * dependency would not earn its bytes.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
