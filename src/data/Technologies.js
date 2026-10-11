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
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg",
  redis:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg",
};

const languages = [
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "Python", icon: ICONS.python },
  { name: "Go", icon: ICONS.go },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

const frontend = [
  { name: "React", icon: reactjs },
  { name: "React Native", icon: reactNative },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "MUI", icon: muiIcon },
  { name: "Three.js", icon: threejs },
];

const backend = [
  { name: "Node.js", icon: nodejs },
  { name: "Express", icon: expressIcon },
  { name: "MongoDB", icon: mongodb },
  { name: "MySQL", icon: mysql },
  { name: "PostgreSQL", icon: ICONS.postgres },
  { name: "Redis", icon: ICONS.redis },
];

const tools = [
  { name: "Git", icon: git },
  { name: "Docker", icon: docker },
  { name: "AWS", icon: ICONS.aws },
  { name: "Microsoft IIS", icon: iis },
];

/** Tech grouped for the Tech section. Each group has a titleKey for i18n and items. */
export const techGroups = [
  { titleKey: "languages", items: languages },
  { titleKey: "frontend", items: frontend },
  { titleKey: "backend", items: backend },
  { titleKey: "tools", items: tools },
];

/** Flat list (legacy) – all technologies in one array. */
export const technologies = [...languages, ...frontend, ...backend, ...tools];
