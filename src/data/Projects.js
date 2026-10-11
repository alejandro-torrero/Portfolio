import {
  odDashboard,
  ticketSenderCartoon,
  dashboardSAV,
  splashPageForm,
  appPresentation,
  leetcodeCover,
  reflexionCover,
  correctiveRagCover,
} from "../assets";

export const projects = [
  {
    id: "6f2a9c14-3e7b-4d81-9a05-c8b1e4f07d22",
    name: {
      en: "Reflexion agent",
      es: "Agente de reflexión",
    },
    featured: true,
    description: {
      en: "LangGraph course project. A simple graph drafts an answer, reflects on it, and then responds back to the user.",
      es: "Proyecto del curso de LangGraph. Un grafo simple redacta una respuesta, reflexiona sobre ella y luego responde al usuario.",
    },
    tags: [
      {
        name: "Python",
        color: "#3776ab",
      },
      {
        name: "LangGraph",
        color: "#4f46e5",
      },
      {
        name: "LangChain",
        color: "#1c8c6e",
      },
    ],
    image: reflexionCover,
    source_code_link: "https://github.com/alejandro-torrero/reflexion-agent",
    link: "/project/6f2a9c14-3e7b-4d81-9a05-c8b1e4f07d22",
  },
  {
    id: "c7d91e4a-2b58-4f63-8a10-6e3c5b9d1f04",
    name: {
      en: "Corrective RAG",
      es: "RAG correctivo",
    },
    featured: true,
    description: {
      en: "Corrective RAG integration. Retrieved documents are graded, and the graph searches the web when they are not relevant before it answers.",
      es: "Integración de RAG correctivo. Los documentos recuperados se evalúan, y el grafo busca en la web cuando no son relevantes antes de responder.",
    },
    tags: [
      {
        name: "Python",
        color: "#3776ab",
      },
      {
        name: "LangGraph",
        color: "#4f46e5",
      },
      {
        name: "LangChain",
        color: "#1c8c6e",
      },
    ],
    image: correctiveRagCover,
    source_code_link: "https://github.com/alejandro-torrero/corrective-rag",
    link: "/project/c7d91e4a-2b58-4f63-8a10-6e3c5b9d1f04",
  },
  {
    id: "48e23f86-11a8-48a7-b9ad-a55ba813dc78",
    featured: true,
    name: {
      en: "LeetCode solutions",
      es: "Soluciones de LeetCode",
    },
    description: {
      en: "Solutions to LeetCode problems I've solved. It isn't exactly a project, but a reference of the exercises I've done.",
      es: "Soluciones a problemas de LeetCode que he resuelto. No es exactamente un proyecto, sino una referencia de los ejercicios que he practicado.",
    },
    tags: [],
    image: leetcodeCover,
    source_code_link: "https://github.com/alejandro-torrero/leetcode",
    link: "/project/48e23f86-11a8-48a7-b9ad-a55ba813dc78",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: {
      en: "Data Dashboard Integration System",
      es: "Sistema de Integración de Dashboard de Datos",
    },
    featured: true,
    description: {
      en: "BI platform integrating third-party APIs and semi-manual data input. Centralizing key metrics on agent and user statuses.",
      es: "Plataforma BI que integra APIs de terceros y entrada de datos semi-manual. Centraliza métricas clave sobre estado de agentes y usuarios.",
    },
    tags: [
      {
        name: "React",
        color: "#008ffb",
      },
      {
        name: "MongoDB",
        color: "#4faa41",
      },
      {
        name: "MUI",
        color: "#007fff",
      },
    ],
    image: odDashboard,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440001",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: {
      en: "Barcode Scanner App",
      es: "App Escáner de Códigos de Barras",
    },
    description: {
      en: "Multi-format barcode scanner using React Native, streamlining data entry by scanning codes and sending them via email. Enabled quick copy-paste functionality to simplify the invoice payment process.",
      es: "Escáner de códigos de barras multi-formato con React Native que agiliza la entrada de datos escaneando códigos y enviándolos por correo. Incluye copiar-pegar rápido para simplificar el pago de facturas.",
    },
    tags: [
      {
        name: "React Native",
        color: "#00a9d9",
      },
      {
        name: "Expo",
        color: "#ffffff",
      },
    ],
    image: appPresentation,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440002",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: {
      en: "Splash Page Form",
      es: "Formulario Splash Page",
    },
    description: {
      en: "Dynamic and adaptable splash page for Wi-Fi networks, collecting user information through a form and Cisco Meraki's URL parameters.",
      es: "Página splash dinámica y adaptable para redes Wi-Fi, que recopila información del usuario mediante un formulario y parámetros URL de Cisco Meraki.",
    },
    tags: [
      {
        name: "NodeJS",
        color: "#21a366",
      },
    ],
    image: splashPageForm,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440003",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: {
      en: "Asset Management System",
      es: "Sistema de Gestión de Activos",
    },
    description: {
      en: "Custom Asset Management System for improved asset tracking and management, integrating asset responsibilities, documentation, and value tracking to streamline collaboration between finance and IT departments.",
      es: "Sistema personalizado de gestión de activos para mejor seguimiento y administración, integrando responsabilidades, documentación y valor para agilizar la colaboración entre finanzas e IT.",
    },
    tags: [
      {
        name: "React",
        color: "#008ffb",
      },
      {
        name: "MySQL",
        color: "#4479a1",
      },
    ],
    image: dashboardSAV,
    source_code_link: null,
    link: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: {
      en: "Ticket Sender",
      es: "Ticket Sender",
    },
    description: {
      en: "Automatic single execution code that sends custom emails in order to create an IT ticket. In need to send massive amounts of IT tickets for administrative tasks.",
      es: "Código de ejecución única automático que envía correos personalizados para crear tickets IT. Pensado para enviar grandes cantidades de tickets administrativos.",
    },
    tags: [
      {
        name: "NodeJS",
        color: "#21a366",
      },
      {
        name: "JavaScript",
        color: "#e8d44d",
      },
      {
        name: "Nodemailer",
        color: "#18a9a0",
      },
    ],
    image: ticketSenderCartoon,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440005",
  },
];
