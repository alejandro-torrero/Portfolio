import { reactjs, typescript, mobileIcon, computerScience } from "../assets";

/** Focus areas for the About section. Order must match `about.services` in the locale files. */
export const services = [
  {
    title: "Web apps & dashboards",
    icon: reactjs,
    tags: ["React", "Node.js", "MUI", "MongoDB", "MySQL"],
  },
  {
    title: "Voice & AI automation",
    icon: typescript,
    tags: ["TypeScript", "SIP", "RPA"],
  },
  {
    title: "Mobile apps",
    icon: mobileIcon,
    tags: ["React Native", "Expo"],
  },
  {
    title: "Networks & infrastructure",
    icon: computerScience,
    tags: ["Cisco Meraki", "Fortinet", "Docker", "AWS"],
  },
];
