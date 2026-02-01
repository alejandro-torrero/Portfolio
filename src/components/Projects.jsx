import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../data";
import { fadeIn, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

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

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <motion.div
        whileHover={{ scale: 1.02, cursor: "pointer" }}
        className="bg-tertiary/80 hover:bg-tertiary p-5 rounded-2xl sm:w-[360px] min-h-[440px] w-full border border-white/5 transition-colors"
        onClick={() => link && nav(link)}
      >
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {source_code_link != null && (
            <div
              className="absolute inset-0 flex justify-end m-3 card-img_hover"
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
            >
              <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[22px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">
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
  const { t } = useLanguage();
  const localeList = t("projects.list") ?? [];
  const projectsWithLocale = projects.map((p, i) => ({
    ...p,
    name: localeList[i]?.name ?? p.name,
    description: localeList[i]?.description ?? p.description,
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("projects.sectionSubText")}</p>
        <h2 className={styles.sectionHeadText}>{t("projects.sectionHeadText")}</h2>
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
