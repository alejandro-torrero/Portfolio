import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../data";
import { fadeIn, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProjectCard = ({
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
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="group relative p-5 rounded-2xl sm:w-[360px] min-h-[440px] w-full border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={handleCardClick}
      >
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-white/5">
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

        <div className="mt-5">
          <h3 className="text-white font-bold text-[22px] group-hover:text-[#4a77ff]/90 transition-colors">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

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
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const raw = t("projects.list", { returnObjects: true });
  const localeList = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const projectsWithLocale = projects.map((p, i) => ({
    ...p,
    name: localeList[i]?.name ?? p.name,
    description: localeList[i]?.description ?? p.description,
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("projects.sectionSubText")}</p>
        <h2 className={styles.sectionHeadText}>
          {t("projects.sectionHeadText")}
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        {t("projects.description")}
      </motion.p>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsWithLocale.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          className="border border-[#4a77ff] text-[#4a77ff] font-semibold bg-transparent hover:bg-[#4a77ff] hover:text-white transition-colors duration-300 px-5 py-2.5 rounded-lg"
          onClick={() => nav("/projects")}
        >
          {t("projects.moreButton")}
        </button>
      </div>
    </>
  );
};

export default SectionWrapper("projects", Projects);
export { ProjectCard };
