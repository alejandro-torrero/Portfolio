import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { projects } from "../data";
import { github } from "../assets";
import { styles } from "../styles";
import { staggerContainer, fadeIn } from "../utils/motion";

/** Full-width list-style card for the projects page */
const ProjectListCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  link,
}) => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const hasLink = Boolean(link);
  const hasCode = source_code_link != null;

  const handleCardClick = () => {
    if (link) nav(link);
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.1, 0.6)}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group relative w-full rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row min-h-0"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={handleCardClick}
      >
        {/* Image – left on desktop, top on mobile */}
        <div className="relative w-full md:w-72 lg:w-80 md:min-w-[280px] h-48 md:h-auto md:min-h-[200px] flex-shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end gap-3 pb-4">
            {hasLink && (
              <span className="text-white font-semibold text-sm px-4 py-2 rounded-lg bg-[#4a77ff]">
                {t("projects.viewProject")}
              </span>
            )}
            {hasCode && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
              >
                <img src={github} alt="" className="w-5 h-5" />
                {t("projects.viewCode")}
              </button>
            )}
          </div>
          {hasCode && !hasLink && (
            <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20"
              >
                <img src={github} alt="source code" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-center min-w-0">
          <h3 className="text-white font-bold text-xl md:text-2xl group-hover:text-[#4a77ff]/90 transition-colors">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] md:text-[15px] leading-relaxed line-clamp-3 md:line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={`${name}-${tag.name}`}
                className="border rounded-lg px-3 py-1"
                style={{ borderColor: tag.color }}
              >
                <p className="text-[14px]" style={{ color: tag.color }}>
                  {tag.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectList = () => {
  const { t } = useTranslation();
  const raw = t("projects.list", { returnObjects: true });
  const localeList = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const projectsWithLocale = projects.map((p, i) => ({
    ...p,
    name: localeList[i]?.name ?? p.name,
    description: localeList[i]?.description ?? p.description,
  }));

  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className={`${styles.padding} pt-28 pb-16 max-w-7xl mx-auto w-full flex-1`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-white font-medium text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("projects.backToHome")}
          </Link>
          <p className="text-secondary uppercase tracking-wider sm:text-[18px] text-[14px]">
            {t("projects.sectionSubText")}
          </p>
          <h1 className="text-white font-black md:text-[56px] sm:text-[48px] xs:text-[40px] text-[32px] mt-2 blue-text-gradient">
            {t("projects.pageTitle")}
          </h1>
          <p className="mt-4 text-secondary text-[17px] max-w-2xl leading-relaxed">
            {t("projects.description")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {projectsWithLocale.map((project, index) => (
            <ProjectListCard key={`project-${index}`} index={index} {...project} />
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectList;
