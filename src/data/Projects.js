import {
  odDashboard,
  ticketSenderCartoon,
  dashboardSAV,
  splashPageForm,
  appPresentation,
} from "../assets";

export const projects = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Data Dashboard Integration System",
    description:
      "BI platform integrating third-party APIs and semi-manual data input. Centralizing key metrics on agent and user statuses.",
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
    name: "Barcode Scanner App",
    description:
      "Multi-format barcode scanner using React Native, streamlining data entry by scanning codes and sending them via email. Enabled quick copy-paste functionality to simplify the invoice payment process.",
    tags: [
      {
        name: "React Native",
        color: "#00a9d9",
      },
      {
        name: "expo",
        color: "#ffffff",
      },
    ],
    image: appPresentation,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440002",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Splash Page Form",
    description:
      "Dynamic and adaptable splash page for Wi-Fi networks, collecting user information through a form and Cisco Meraki's URL parameters.",
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
    name: "Asset Management System",
    description:
      "Custom Asset Management System for improved asset tracking and management, integrating asset responsibilities, documentation, and value tracking to streamline collaboration between finance and IT departments.",
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
    name: "Ticket Sender",
    description:
      "Automatic single execution code that sends custom emails in order to create an IT ticket. In need to send masive amounts of IT tickets for administrative tasks.",
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
        color: "#18a9a0 ",
      },
    ],
    image: ticketSenderCartoon,
    source_code_link: null,
    link: "/project/550e8400-e29b-41d4-a716-446655440005",
  },
];
