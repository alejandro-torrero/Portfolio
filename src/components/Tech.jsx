import { SectionWrapper } from "../hoc";
import { techGroups } from "../data";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from "react-i18next";

const TechCard = ({ icon, name }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl p-4 bg-tertiary/40 hover:bg-tertiary/70 border border-white/[0.06] hover:border-[#4a77ff]/30 h-[120px] min-w-[100px] flex flex-col justify-center items-center gap-3 transition-all duration-300 shadow-none hover:shadow-[0_8px_32px_-8px_rgba(74,119,255,0.25)]"
    >
      <div className="relative flex items-center justify-center w-14 h-14">
        <img
          src={icon}
          alt={name}
          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <span className="text-secondary text-xs font-medium text-center leading-tight line-clamp-2 px-0.5">
        {name}
      </span>
    </motion.div>
  );
};

const Tech = () => {
  const { t } = useTranslation();

  const groupTitleKey = {
    frontend: "tech.groupFrontend",
    backend: "tech.groupBackend",
  };

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

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {techGroups.map((group, groupIndex) => (
          <motion.div
            key={group.titleKey}
            variants={fadeIn("up", "spring", groupIndex * 0.08, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-tertiary/30 to-tertiary/10 border border-white/[0.06] p-6 sm:p-8"
          >
            {/* Accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4a77ff] via-[#4a77ff]/70 to-[#00cea8]/80 rounded-l-2xl"
              aria-hidden
            />
            <div className="pl-4 sm:pl-5">
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-widest mb-1">
                {t(groupTitleKey[group.titleKey] || group.titleKey)}
              </h3>
              <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-[#4a77ff] to-[#00cea8] mb-6" />
              <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
                {group.items.map((tech) => (
                  <TechCard key={tech.name} icon={tech.icon} name={tech.name} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("tech", Tech);
