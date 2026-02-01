import { SectionWrapper } from "../hoc";
import { technologies } from "../data";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useLanguage } from "../contexts/LanguageContext";

const TechCard = ({ icon, name }) => {
  return (
    <div className="rounded-xl p-3 bg-tertiary/80 hover:bg-tertiary border border-white/5 h-[112px] flex flex-col justify-center items-center gap-2 transition-colors">
      <img src={icon} alt={name} className="w-12 h-12 object-contain" />
      <span className="text-secondary text-xs text-center truncate w-full px-1">
        {name}
      </span>
    </div>
  );
};

const Tech = () => {
  const { t } = useLanguage();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("tech.sectionSubText")}</p>
        <h2 className={styles.sectionHeadText}>{t("tech.sectionHeadText")}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        {t("tech.description")}
      </motion.p>

      <div className="flex flex-row flex-wrap justify-center gap-6 mt-10">
        {technologies.map((tech) => (
          <div className="w-28 h-28" key={tech.name}>
            <TechCard icon={tech.icon} name={tech.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("tech", Tech);
