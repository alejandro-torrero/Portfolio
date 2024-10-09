import { carrent, jobit, tripguide, assetSAV, dashboardSAV } from "../assets";

export const projects = [
  {
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
    image: carrent,
    source_code_link: null,
  },
  {
    name: "Barcode Scanner App",
    description:
      "Multi-format barcode scanner using React Native, streamlining data entry by scanning codes and sending them via email. Enabled quick copy-paste functionality to simplify the invoice payment process.",
    tags: [
      {
        name: "React Native",
        color: "#00a9d9",
      },
    ],
    image: jobit,
    source_code_link: null,
  },
  {
    name: "Splash Page Form",
    description:
      "Dynamic and adaptable splash page for Wi-Fi networks, collecting user information through a form and Cisco Meraki's URL parameters.",
    tags: [
      {
        name: "NodeJS",
        color: "#21a366",
      },
    ],
    image: tripguide,
    source_code_link: null,
  },
  {
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
    link: "smart-asset-vinte",
  },
  {
    name: "Ticket Sender",
    description: "Automatic ",
    tags: [],
    image: null,
    source_code_link: null,
    link: "",
  },
];
