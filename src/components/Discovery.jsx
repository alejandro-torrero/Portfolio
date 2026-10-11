import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import SectionHeader from "./SectionHeader";
import DiscoveryCard, { useLocalizedDiscoveries } from "./DiscoveryCard";

const Discovery = () => {
  const { t } = useTranslation();
  const all = useLocalizedDiscoveries();
  const featured = all.filter((d) => d.featured).slice(0, 3);

  return (
    <>
      <SectionHeader
        subText={t("discovery.sectionSubText")}
        headText={t("discovery.featuredHeadText")}
        description={t("discovery.description")}
      >
        <Link
          to="/discoveries"
          className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:border-accent-blue hover:text-accent-blue transition-colors"
        >
          {t("discovery.viewAll", { count: all.length })}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </SectionHeader>

      {featured.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 min-[880px]:grid-cols-3 gap-5">
          {featured.map((item, index) => (
            <motion.div key={item.id ?? item.name} variants={fadeIn("up", "spring", index * 0.15, 0.75)}>
              <DiscoveryCard {...item} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-secondary text-[15px] leading-relaxed max-w-2xl">
          {t("discovery.emptyFeatured")}
        </p>
      )}

      <Link
        to="/discoveries"
        className="md:hidden mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:border-accent-blue hover:text-accent-blue transition-colors"
      >
        {t("discovery.viewAll", { count: all.length })}
      </Link>
    </>
  );
};

export default SectionWrapper("discovery", Discovery);
