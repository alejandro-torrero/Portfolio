import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { discoveries } from "../data";
import { styles } from "../styles";
import DiscoveryCard, { useLocalizedDiscoveries } from "./DiscoveryCard";

const normalize = (value) => value.trim().toLowerCase();

const DiscoveryList = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const discoveriesWithLocale = useLocalizedDiscoveries();

  const tagCounts = useMemo(() => {
    const counts = new Map();
    discoveries.forEach((d) =>
      d.tags.forEach((tag) => counts.set(tag.name, (counts.get(tag.name) ?? 0) + 1))
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const q = normalize(query);
  const filtered = discoveriesWithLocale.filter((d) => {
    if (activeTag && !d.tags.some((tag) => tag.name === activeTag)) return false;
    if (!q) return true;
    const creatorNames = (d.credits?.creators ?? []).map((c) => c.name).join(" ");
    return (
      normalize(d.name).includes(q) ||
      normalize(d.description).includes(q) ||
      normalize(creatorNames).includes(q) ||
      d.tags.some((tag) => normalize(tag.name).includes(q))
    );
  });

  const clearFilters = () => {
    setQuery("");
    setActiveTag(null);
  };

  const chipClass = (active) =>
    `shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-accent-blue bg-accent-blue text-white"
        : "border-white/10 bg-white/[0.03] text-secondary hover:text-white hover:border-white/25"
    }`;

  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className={`${styles.paddingX} pt-28 sm:pt-32 pb-16 max-w-7xl mx-auto w-full flex-1`}>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-white font-medium text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("discovery.backToHome")}
          </Link>
          <p className="text-secondary uppercase tracking-wider sm:text-[18px] text-[14px]">
            {t("discovery.sectionSubText")}
          </p>
          <h1 className="text-white font-black md:text-[56px] sm:text-[48px] xs:text-[40px] text-[32px] mt-2 blue-text-gradient">
            {t("discovery.pageTitle")}
          </h1>
          <p className="mt-4 text-secondary text-[16px] max-w-2xl leading-relaxed">
            {t("discovery.pageDescription")}
          </p>
        </motion.header>

        {discoveries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sticky top-20 z-10 mt-10 -mx-2 px-2 py-3 bg-primary/80 backdrop-blur-md"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative md:w-72 shrink-0">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("discovery.searchPlaceholder")}
                  aria-label={t("discovery.searchPlaceholder")}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-secondary/70 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/30 transition"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none]">
                <button
                  type="button"
                  className={chipClass(activeTag === null)}
                  onClick={() => setActiveTag(null)}
                >
                  {t("discovery.filterAll")} <span className="opacity-60">{discoveries.length}</span>
                </button>
                {tagCounts.map(([tag, count]) => (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={activeTag === tag}
                    className={chipClass(activeTag === tag)}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  >
                    {tag} <span className="opacity-60">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {discoveries.length > 0 && (
          <p className="mt-4 mb-6 text-sm text-secondary" aria-live="polite">
            {t("discovery.resultsCount", { count: filtered.length, total: discoveries.length })}
          </p>
        )}

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id ?? item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <DiscoveryCard {...item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center mt-10">
            <p className="text-white font-semibold">
              {discoveries.length === 0 ? t("discovery.emptyList") : t("discovery.noResults")}
            </p>
            {discoveries.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-lg border border-accent-cyan px-4 py-2 text-sm font-semibold text-accent-cyan hover:bg-accent-cyan hover:text-white transition-colors"
              >
                {t("discovery.clearFilters")}
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DiscoveryList;
