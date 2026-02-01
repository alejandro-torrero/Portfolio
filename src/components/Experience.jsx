import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { experiences } from "../data";
import { useLanguage } from "../contexts/LanguageContext";

const ExperienceCard = ({ experience, localeContent }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#082540", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232621" }}
      iconStyle={{ backgroundColor: experience.iconBg }}
      icon={
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={experience.icon}
            alt={localeContent?.company_name ?? experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
      iconOnClick={() => {
        window.open(experience.companyLink, "_blank");
      }}
      iconClassName="hover:cursor-pointer"
    >
      <div>
        <h3 className="font-bold text-white text-[24px]">
          {localeContent?.title ?? experience.title}
        </h3>
        <p className="text-secondary">
          {localeContent?.company_name ?? experience.company_name}
        </p>
        <p className="text-secondary/80 text-sm">{localeContent?.date}</p>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {(localeContent?.points ?? experience.points).map((item, index) => (
            <li
              key={index}
              className="text-white/90 text-[14px] pl-1 tracking-wider"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const localeExperiences = t("work.experiences") ?? [];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("work.sectionSubText")}</p>
        <h2 className={styles.sectionHeadText}>{t("work.sectionHeadText")}</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="#082540">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company_name + index}
              experience={experience}
              localeContent={localeExperiences[index]}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper("work", Experience);
