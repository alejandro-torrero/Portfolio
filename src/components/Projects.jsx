import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import SectionHeader from "./SectionHeader";
import ProjectCard, { useLocalizedProjects } from "./ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const all = useLocalizedProjects();
  const featured = all.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <SectionHeader
        subText={t("projects.sectionSubText")}
        headText={t("projects.featuredHeadText")}
        description={t("projects.description")}
      >
        <Link
          to="/projects"
          className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:border-accent-blue hover:text-accent-blue transition-colors"
        >
          {t("projects.viewAll", { count: all.length })}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </SectionHeader>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 min-[880px]:grid-cols-3 gap-5">
        {featured.map((project, index) => (
          <motion.div key={project.id ?? project.name} variants={fadeIn("up", "spring", index * 0.15, 0.75)}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      <Link
        to="/projects"
        className="md:hidden mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-accent-blue hover:text-accent-blue transition-colors"
      >
        {t("projects.viewAll", { count: all.length })}
      </Link>
    </>
  );
};

export default SectionWrapper("projects", Projects);
