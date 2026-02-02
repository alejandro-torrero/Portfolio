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
import { useTranslation } from "react-i18next";

const ExperienceCard = ({ experience, localeContent }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(255, 255, 255, 0.04)",
        color: "#fff",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(139, 92, 246, 0.4)" }}
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
  const { t } = useTranslation();
  const raw = t("work.experiences", { returnObjects: true });
  const localeExperiences = Array.isArray(raw) ? raw : raw ? [raw] : [];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} section-sub-accent`}>{t("work.sectionSubText")}</p>
        <h2 className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
          {t("work.sectionHeadText")}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(139, 92, 246, 0.4)">
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
