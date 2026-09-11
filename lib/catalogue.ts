import { powerSourceLabels, toolCategories, toolGroups } from "@/data/toolCategories";
import { routes } from "@/lib/routes";
import type {
  NavItem,
  PhotographedToolCategory,
  PowerSource,
  ToolCategory,
  ToolCategoryGroup,
  ToolGroupId,
  ToolItem,
} from "@/types/content";

/**
 * Read-only selectors and formatters over the tool range.
 *
 * `data/toolCategories.ts` stays a plain list. Every derived view the site needs
 * (Home cards, the grouped index, footer links, display names) is computed here,
 * so no component repeats the same filtering logic or imports the data itself.
 *
 * Server-side only in practice: nothing under a `"use client"` boundary should
 * import this module, or the whole catalogue would ship to the browser.
 */

/** "Khurpi (hand hoe and weeder)" when a tool has an Indian name, "Loppers" when it does not. */
export function formatToolName(tool: ToolItem): string {
  return tool.localName ? `${tool.localName} (${tool.name})` : tool.name;
}

export function formatPowerSource(source: PowerSource): string {
  return powerSourceLabels[source];
}

function isPhotographed(category: ToolCategory): category is PhotographedToolCategory {
  return category.image !== undefined;
}

/** Categories that can render as image cards on the Home page, in catalogue order. */
export function getHomeCategoryCards(): PhotographedToolCategory[] {
  return toolCategories.filter(isPhotographed).filter((category) => category.featured === true);
}

export function getCategoriesInGroup(group: ToolGroupId): ToolCategory[] {
  return toolCategories.filter((category) => category.group === group);
}

/** Both groups with their categories, ready for the complete range index. */
export function getGroupedCategories(): ToolCategoryGroup[] {
  return toolGroups.map((group) => ({ ...group, categories: getCategoriesInGroup(group.id) }));
}

/**
 * Looks a category up by slug. Throws on an unknown slug, so a typo in a curated
 * list (the footer, for example) fails the build instead of shipping a dead link.
 */
export function getCategory(slug: string): ToolCategory {
  const category = toolCategories.find((entry) => entry.slug === slug);
  if (!category) {
    throw new Error(`Unknown tool category slug: "${slug}"`);
  }
  return category;
}

/** Navigation links for a curated list of category slugs, labelled with each short title. */
export function getCategoryLinks(slugs: readonly string[]): NavItem[] {
  return slugs.map((slug) => {
    const category = getCategory(slug);
    return { label: category.shortTitle, href: routes.toolCategory(category.slug) };
  });
}
