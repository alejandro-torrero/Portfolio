import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../data";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useLanguage } from "../contexts/LanguageContext";

const ServiceCard = ({ index, title, icon, icon2 }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-blue-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
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
  const { t } = useLanguage();
  const serviceTitles = t("about.services");
  const titlesArray = Array.isArray(serviceTitles)
    ? serviceTitles
    : [serviceTitles];

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("about.sectionSubText")}</p>
        <h2 className={styles.sectionHeadText}>{t("about.sectionHeadText")}</h2>
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
            title={titlesArray[index] ?? service.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper("about", About);
