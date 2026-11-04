import { leetcodeContent } from "./leetcode";
import {deepLearningContent} from "./deep-learning"

/** Map of project.id → detail content. Add new modules here as you create them. */
export const projectContentById = {
  [leetcodeContent.projectId]: leetcodeContent,
  [deepLearningContent.projectId]: deepLearningContent,
};

export const getProjectContent = (projectId) => projectContentById[projectId] ?? null;
