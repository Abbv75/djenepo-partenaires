/**
 * Resolves a blog image URL:
 * - If the URL starts with http:// or https://, it is already absolute → return as-is
 * - Otherwise it is a relative path (e.g. /assets/blog/...) served by the
 *   Vite frontend dev server or the built bundle → return as-is so the browser
 *   resolves it against the current origin.
 */
export function resolveImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) return '';
  return imageUrl;
}
