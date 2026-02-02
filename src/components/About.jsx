import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../data";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ index, title, icon, icon2 }) => {
  return (
    <Tilt className="xs:w-[250px] w-full" options={{ max: 45, scale: 1, speed: 450 }}>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full rounded-[20px] overflow-hidden border border-white/10 hover:border-accent-cyan/50 transition-colors duration-300"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <div className="flex gap-3">
            <img src={icon} alt="" className="w-16 h-16 object-contain" />
            {icon2 && (
              <img src={icon2} alt="" className="w-16 h-16 object-contain" />
            )}
          </div>
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const { t } = useTranslation();
  const titlesArray = t("about.services", { returnObjects: true }) ?? [];
  const safeTitles = Array.isArray(titlesArray) ? titlesArray : [titlesArray];

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} section-sub-accent`}>{t("about.sectionSubText")}</p>
        <h2 className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
          {t("about.sectionHeadText")}
        </h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        {t("about.description")}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
            title={safeTitles[index] ?? service.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper("about", About);
