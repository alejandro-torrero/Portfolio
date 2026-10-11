import { VinteIcon } from "../assets";

/** Newest first. Order must match `work.experiences` in the locale files. */
export const experiences = [
  {
    title: "Software Developer",
    company_name: "Xira",
    icon: "https://xira.ai/wp-content/uploads/2021/03/XIRA-BLANCO-1-1.svg",
    iconBg: "#383E56",
    companyLink: "https://xira.ai/",
    date: "Nov 2024 - Today",
    current: true,
    tags: ["TypeScript", "JavaScript", "SIP", "RPA", "Concurrency"],
    points: [
      "Work primarily on JavaScript and TypeScript projects as AI wrappers.",
      "Build voicebots with SIP connectivity integrated with carriers.",
      "Develop RPAs (Robotic Process Automation) for workflow automation.",
      "Use concurrency programming to build workers that handle highly complex flows.",
    ],
  },
  {
    title: "IT Support Auxiliary",
    company_name: "Inmobiliaria Vinte",
    icon: VinteIcon,
    iconBg: "#383E56",
    companyLink: "https://vinte.com/es/",
    date: "May 2023 - Nov 2024",
    tags: ["Cisco Meraki", "Fortinet", "VBA", "MVC", "Database design"],
    points: [
      "Administered national office networks using the Cisco Meraki web platform and directly managed network devices.",
      "Managed and configured Fortinet firewalls at a national level, maintaining VPNs, routing, security, and SD-WAN functionality.",
      "Developed multiple programming projects to optimize processes, leveraging MVC architecture, VBA macros in Excel, and database design and management.",
      "Utilized console APIs to generate custom reports and support IT administration tasks.",
      "Develop technical solutions with a deep understanding of programming fundamentals and system architecture.",
    ],
  },
];
