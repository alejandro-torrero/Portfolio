/**
 * Map of discovery.id → detail content.
 * Add a module per discovery (see projects-content/leetcode.js for the shape)
 * and register it here.
 *
 * Extra discovery fields (optional):
 * - credits: { creators: [{ name, url? }], note?: { en, es } }
 *   overrides list-level credits on the detail page when present
 */
export const discoveryContentById = {};

export const getDiscoveryContent = (discoveryId) =>
  discoveryContentById[discoveryId] ?? null;
