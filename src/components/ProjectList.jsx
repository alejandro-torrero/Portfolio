import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { projects } from "../data";
import { github } from "../assets";
import { styles } from "../styles";

const normalize = (value) => value.trim().toLowerCase();

const TagPill = ({ tag }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/80"
  >
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: tag.color.trim() }}
    />
    {tag.name}
  </span>
);

const ProjectGridCard = ({ name, description, tags, image, source_code_link, link }) => {
  const { t } = useTranslation();
  const hasLink = Boolean(link);
  const hasCode = source_code_link != null;

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
        {!hasLink && (
          <span className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white/70">
            {t("projects.detailsSoon")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-accent-cyan transition-colors">
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagPill key={`${name}-${tag.name}`} tag={tag} />
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          {hasLink ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue group-hover:gap-2.5 transition-all">
              {t("projects.viewProject")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          ) : (
            <span />
          )}
          {hasCode && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(source_code_link, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <img src={github} alt="" className="w-4 h-4" />
              {t("projects.viewCode")}
            </button>
          )}
        </div>
      </div>
    </>
  );

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(74,119,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue";

  return hasLink ? (
    <Link to={link} className={cardClass}>
      {body}
    </Link>
  ) : (
    <div className={cardClass}>{body}</div>
  );
};

const ProjectList = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const raw = t("projects.list", { returnObjects: true });
  const localeList = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const projectsWithLocale = projects.map((p, i) => ({
    ...p,
    name: localeList[i]?.name ?? p.name,
    description: localeList[i]?.description ?? p.description,
  }));

  const tagCounts = useMemo(() => {
    const counts = new Map();
    projects.forEach((p) =>
      p.tags.forEach((tag) => counts.set(tag.name, (counts.get(tag.name) ?? 0) + 1))
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const q = normalize(query);
  const filtered = projectsWithLocale.filter((p) => {
    if (activeTag && !p.tags.some((tag) => tag.name === activeTag)) return false;
    if (!q) return true;
    return (
      normalize(p.name).includes(q) ||
      normalize(p.description).includes(q) ||
      p.tags.some((tag) => normalize(tag.name).includes(q))
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

      <main className={`${styles.padding} pt-28 pb-16 max-w-7xl mx-auto w-full flex-1`}>
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
            {t("projects.backToHome")}
          </Link>
          <p className="text-secondary uppercase tracking-wider sm:text-[18px] text-[14px]">
            {t("projects.sectionSubText")}
          </p>
          <h1 className="text-white font-black md:text-[56px] sm:text-[48px] xs:text-[40px] text-[32px] mt-2 blue-text-gradient">
            {t("projects.pageTitle")}
          </h1>
          <p className="mt-4 text-secondary text-[16px] max-w-2xl leading-relaxed">
            {t("projects.pageDescription")}
          </p>
        </motion.header>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("projects.searchPlaceholder")}
                aria-label={t("projects.searchPlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-secondary/70 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/30 transition"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none]">
              <button type="button" className={chipClass(activeTag === null)} onClick={() => setActiveTag(null)}>
                {t("projects.filterAll")} <span className="opacity-60">{projects.length}</span>
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

        <p className="mt-4 mb-6 text-sm text-secondary" aria-live="polite">
          {t("projects.resultsCount", { count: filtered.length, total: projects.length })}
        </p>

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id ?? project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectGridCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <p className="text-white font-semibold">{t("projects.noResults")}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-lg border border-accent-cyan px-4 py-2 text-sm font-semibold text-accent-cyan hover:bg-accent-cyan hover:text-white transition-colors"
            >
              {t("projects.clearFilters")}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectList;
