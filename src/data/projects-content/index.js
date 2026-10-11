import { leetcodeContent } from "./leetcode";

/** Map of project.id → detail content. Add new modules here as you create them. */
export const projectContentById = {
  [leetcodeContent.projectId]: leetcodeContent,
};

export const getProjectContent = (projectId) => projectContentById[projectId] ?? null;
