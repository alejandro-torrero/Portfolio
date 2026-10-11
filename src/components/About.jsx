import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { services } from "../data";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import SectionHeader from "./SectionHeader";

const FocusCard = ({ index, icon, title, description, tags }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.12, 0.75)}
    className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-colors hover:border-accent-blue/40"
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/10">
      <img src={icon} alt="" className="w-7 h-7 object-contain" />
    </div>
    <h3 className="mt-5 text-white font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-secondary text-[14px] leading-relaxed flex-1">{description}</p>
    <div className="mt-5 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-white/75"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const About = () => {
  const { t } = useTranslation();
  const raw = t("about.services", { returnObjects: true });
  const localeServices = Array.isArray(raw) ? raw : [];

  return (
    <>
      <SectionHeader
        subText={t("about.sectionSubText")}
        headText={t("about.sectionHeadText")}
        description={t("about.description")}
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <FocusCard
            key={service.title}
            index={index}
            {...service}
            title={localeServices[index]?.title ?? service.title}
            description={localeServices[index]?.description ?? ""}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("about", About);
