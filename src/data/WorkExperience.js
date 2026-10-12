import { VinteIcon } from "../assets";

/** Newest first. Localized fields use `{ en, es }` like Projects. */
export const experiences = [
  {
    title: {
      en: "Software Developer",
      es: "Desarrollador de Software",
    },
    company_name: "Xira",
    icon: "https://xira.ai/wp-content/uploads/2021/03/XIRA-BLANCO-1-1.svg",
    iconBg: "#383E56",
    companyLink: "https://xira.ai/",
    dateStart: "2024-11-08",
    dateEnd: null,
    current: true,
    tags: ["TypeScript", "JavaScript", "Go", "Python", "SIP", "RPA", "Concurrency", "Microservices", "API", "LLM"],
    points: {
      en: [
        "Designed and implemented advanced AI agents to make complex systems more accessible and intuitive",
        "Built and deployed AI-driven solutions powered by LLMs in production environments",
        "Architected and developed scalable APIs and microservices using JavaScript, TypeScript, Python and Go",
        "Deployed containerized microservices handling 5M+ daily requests with high reliability",
        "Owned architectural decisions to ensure scalability, performance, and maintainability",
        "Delivered end-to-end systems in agile environments, from design to production",
        "Build voicebots with SIP connectivity integrated with carriers.",
      ],
      es: [
        "Diseño agentes de IA avanzados para hacer que los sistemas complejos sean más accesibles e intuitivos",
        "Construcción y desplegó soluciones impulsadas por LLMs en entornos de producción",
        "Arquitectura y desarrollo de APIs y microservicios escalables usando JavaScript, TypeScript, Python y Go",
        "Despliegue de microservicios contenerizados que manejan 5M+ solicitudes diarias con alta confiabilidad",
        "Toma de decisiones arquitectónicas para garantizar escalabilidad, rendimiento y mantenibilidad",
        "Entrega de sistemas end-to-end en entornos ágiles, desde el diseño hasta la producción",
        "Construcción de voicebots con conectividad SIP integrada con operadores.",
      ],
    },
  },
  {
    title: {
      en: "IT Support Auxiliary",
      es: "Auxiliar de Soporte IT",
    },
    company_name: "Inmobiliaria Vinte",
    icon: VinteIcon,
    iconBg: "#383E56",
    companyLink: "https://vinte.com/es/",
    dateStart: "2023-01-01",
    dateEnd: "2024-11-01",
    tags: ["Cisco Meraki", "Fortinet", "VBA", "MVC", "Database design", "JavaScript"],
    points: {
      en: [
        "Administered national office networks using the Cisco Meraki web platform and directly managed network devices.",
        "Managed and configured Fortinet firewalls at a national level, maintaining VPNs, routing, security, and SD-WAN functionality.",
        "Developed multiple programming projects to optimize processes, leveraging MVC architecture, VBA macros in Excel, and database design and management.",
        "Utilized console APIs to generate custom reports and support IT administration tasks.",
        "Develop technical solutions with a deep understanding of programming fundamentals and system architecture.",
      ],
      es: [
        "Administré redes de oficinas a nivel nacional usando la plataforma web Cisco Meraki y gestioné dispositivos de red directamente.",
        "Gestioné y configuré firewalls Fortinet a nivel nacional, manteniendo VPNs, enrutamiento, seguridad y funcionalidad SD-WAN.",
        "Desarrollé múltiples proyectos de programación para optimizar procesos, utilizando arquitectura MVC, macros VBA en Excel y diseño y gestión de bases de datos.",
        "Utilicé APIs de consola para generar reportes personalizados y apoyar tareas de administración IT.",
        "Desarrollo soluciones técnicas con un profundo entendimiento de los fundamentos de programación y arquitectura de sistemas.",
      ],
    },
  },
];
