import langchainCert from "../assets/certificates/langchain.jpg";
import dynamicProgrammingCert from "../assets/certificates/dynamic-programming.jpg";
import goCert from "../assets/certificates/go.jpg";

/** Newest first. `date` is the completion date (YYYY-MM-DD). */
export const certificates = [
  {
    name: "LangChain – Agentic AI Engineering with LangChain & LangGraph",
    issuer: "Udemy",
    instructor: "Eden Marco",
    date: "2026-09-29",
    hours: 20.5,
    url: "https://www.udemy.com/certificate/UC-76c19f28-14fe-466c-8297-2915401e5963/",
    image: langchainCert,
    tags: ["LangChain", "LangGraph", "AI Agents"],
  },
  {
    name: "Dynamic Programming",
    issuer: "Udemy",
    instructor: "Inside Code",
    date: "2026-08-02",
    hours: 6,
    url: "https://www.udemy.com/certificate/UC-8fcfe980-0f43-48d9-87fc-f7addb1fe917/",
    image: dynamicProgrammingCert,
    tags: ["Algorithms", "Dynamic Programming"],
  },
  {
    name: "Go – The Complete Guide",
    issuer: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    date: "2026-04-13",
    hours: 15.5,
    url: "https://www.udemy.com/certificate/UC-37081dba-d2e7-4e88-a263-2e17d461e20e/",
    image: goCert,
    tags: ["Go", "Backend"],
  },
];
