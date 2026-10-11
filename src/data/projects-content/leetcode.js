/**
 * Detail-page content for the LeetCode solutions project.
 * Keyed by the same id as in Projects.js so ProjectDetail can look it up.
 *
 * Shape (reusable for other projects):
 * - projectId: string — must match projects[].id
 * - date / lastUpdated: YYYY-MM-DD (optional)
 * - tags: [{ name, color }] (optional; falls back to project.tags)
 * - cover: image import (optional; falls back to project.image)
 * - intro: { en, es } — short lead under the title
 * - sections: [{ id, title: { en, es }, body: { en, es }, images?: [] }]
 * - highlights: [{ en, es }] — optional bullet points
 * - links: [{ label: { en, es }, href }] — optional extra CTAs
 * - disclaimer: { en, es } — optional footnote at the end
 */
export const leetcodeContent = {
  projectId: "48e23f86-11a8-48a7-b9ad-a55ba813dc78",
  date: "2026-10-11",
  lastUpdated: "2026-10-11",
  tags: [
    {
      name: "Algorithms",
      color: "#008ffb",
    },
    {
      name: "Programming",
      color: "#4faa41",
    }
],
  intro: {
    en: "A living reference of problems I've solved on LeetCode, focused on patterns, clean solutions, and steady practice rather than a traditional product build.",
    es: "Una referencia viva de problemas que he resuelto en LeetCode, centrada en patrones, soluciones claras y práctica constante, más que en un producto tradicional.",
  },
  sections: [
    {
      id: "why",
      title: {
        en: "Why this exists",
        es: "Por qué existe",
      },
      body: {
        en: "So, even though we are living in the era of AI, I still think it's important to practice algorithms and hands-on programming. As of now, many peopple are losing their critical thinking and become too dependant on AI. Also, I started programming because of the enyoment of writing code.",
        es: "Aunque vivimos en la era de la IA, sigo pensando que es importante practicar algoritmos y la programación práctica. Hoy en día, muchas personas están perdiendo su capacidad de pensamiento crítico y volviéndose demasiado dependientes de la IA. Además, empecé a programar porque disfruto escribiendo código.",
      },
    },
    {
      id: "approach",
      title: {
        en: "How I approach problems",
        es: "Cómo abordo los problemas",
      },
      body: {
        en: "There are many 'leetcode paths' to follow in order to study algorithms and problem solving. I've chosen one that aligns with my interests and even though I sometimes encounter a new topic, I'm resilient and like to learn a lot about that topic before even thinking in searching for a video solution or for the shared solutions on leetode. So I prioritize my learning and development of new skills before going the easy path, as I deeply believe that that's the best way of learning. Again, I gotta say that people and enterprises have diminshed the value of knwoledge because of the use of IA, but this is what I think is best.",
        es: "Existen muchas 'rutas de LeetCode' para estudiar algoritmos y resolución de problemas. He elegido una que se alinea con mis intereses y, aunque a veces me encuentro con temas nuevos, mantengo la perseverancia: me gusta aprender a fondo sobre el tema antes siquiera de plantearme buscar una solución en video o consultar las respuestas compartidas en la plataforma. Priorizo ​​mi aprendizaje y el desarrollo de nuevas habilidades frente a tomar el camino fácil, ya que estoy convencido de que esa es la mejor manera de aprender. Debo añadir que, si bien el uso de la IA ha llevado a personas y empresas a restar valor al conocimiento, esta sigue siendo la estrategia que considero más acertada.",
      },
    },   
  ],
  highlights: [
    {
      en: "Solutions organized by topic / pattern in the repo",
      es: "Soluciones organizadas por tema / patrón en el repo",
    },
    {
      en: "Emphasis on readable code and clear complexity notes",
      es: "Énfasis en código legible y notas claras de complejidad",
    },
    {
      en: "Ongoing practice — stats also appear on the Activity section",
      es: "Práctica continua — las estadísticas también aparecen en Actividad",
    },
  ],
  disclaimer: {
    en: "No AI was used to solve any of the problems, nor to write this content",
    es: "No se utilizó IA para resolver ninguno de los problemas, ni para escribir este contenido",
  },
  links: [
    {
      label: {
        en: "Github repo",
        es: "Github repo",
      },
      href: "https://github.com/alejandro-torrero/leetcode",
    },
  ],
};

export default leetcodeContent;
