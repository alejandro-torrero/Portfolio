/**
 * Discoveries — write-ups about open-source projects and tools I've explored.
 * Distinct from Projects: these credit other creators; you're sharing experience, not claiming authorship.
 *
 * Shape:
 * - id: string (UUID)
 * - name / description: { en, es }
 * - featured: boolean — show on the home section
 * - tags: [{ name, color }]
 * - image: cover import from assets (e.g. src/assets/discoveries/…)
 * - original_link: URL of the original project / repo
 * - credits: {
 *     creators: [{ name, url? }],
 *     note?: { en, es } — optional attribution line under the names
 *   }
 * - link: "/discovery/<id>" — detail page (null = card only, no detail yet)
 *
 * Detail body (optional): add a module under discoveries-content/ and register it
 * in discoveries-content/index.js (same shape as projects-content).
 *
 * Example entry:
 * {
 *   id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
 *   name: { en: "Running X locally", es: "Ejecutando X en local" },
 *   featured: true,
 *   description: {
 *     en: "What I learned setting up and using this open-source project.",
 *     es: "Lo que aprendí al configurar y usar este proyecto open source.",
 *   },
 *   tags: [{ name: "Python", color: "#3776ab" }],
 *   image: someCover,
 *   original_link: "https://github.com/org/repo",
 *   credits: {
 *     creators: [{ name: "Jane Doe", url: "https://github.com/janedoe" }],
 *     note: {
 *       en: "Original authors of the project I explored.",
 *       es: "Autores originales del proyecto que exploré.",
 *     },
 *   },
 *   link: "/discovery/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
 * }
 */
export const discoveries = [];
