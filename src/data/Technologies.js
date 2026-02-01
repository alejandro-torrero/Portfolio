import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  threejs,
  iis,
  muiIcon,
  expressIcon,
  mysql,
  reactNative,
  docker,
} from "../assets";

// Icons via CDN for technologies without local assets
const ICONS = {
  aws:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  postgres:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg",
};

const frontend = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "React Native", icon: reactNative },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "MUI", icon: muiIcon },
  { name: "Three.js", icon: threejs },
];

const backendAndTools = [
  { name: "Node JS", icon: nodejs },
  { name: "Express", icon: expressIcon },
  { name: "MongoDB", icon: mongodb },
  { name: "MySQL", icon: mysql },
  { name: "PostgreSQL", icon: ICONS.postgres },
  { name: "Go", icon: ICONS.go },
  { name: "git", icon: git },
  { name: "Microsoft IIS", icon: iis },
  { name: "AWS", icon: ICONS.aws },
  { name: "Docker", icon: docker },
];

/** Tech grouped for the Tech section. Each group has a titleKey for i18n and items. */
export const techGroups = [
  { titleKey: "frontend", items: frontend },
  { titleKey: "backend", items: backendAndTools },
];

/** Flat list (legacy) – all technologies in one array. */
export const technologies = [...frontend, ...backendAndTools];
