import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { techGroups } from "../data";
import { fadeIn } from "../utils/motion";
import SectionHeader from "./SectionHeader";

const groupTitleKey = {
  languages: "tech.groupLanguages",
  frontend: "tech.groupFrontend",
  backend: "tech.groupBackend",
  tools: "tech.groupTools",
};

const TechChip = ({ icon, name }) => (
  <li className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] pl-2 pr-3.5 py-2 transition-colors hover:border-accent-blue/40 hover:bg-white/[0.06]">
    <span className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.08] flex items-center justify-center">
      <img src={icon} alt="" loading="lazy" className="w-6 h-6 object-contain" />
    </span>
    <span className="text-sm font-medium text-white/85">{name}</span>
  </li>
);

const Tech = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        subText={t("tech.sectionSubText")}
        headText={t("tech.sectionHeadText")}
        description={t("tech.description")}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {techGroups.map((group, groupIndex) => (
          <motion.div
            key={group.titleKey}
            variants={fadeIn("up", "spring", groupIndex * 0.08, 0.6)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-blue">
              {t(groupTitleKey[group.titleKey] ?? group.titleKey)}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <TechChip key={tech.name} icon={tech.icon} name={tech.name} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("tech", Tech);
