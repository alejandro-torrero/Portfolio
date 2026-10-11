import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { projects } from "../data";
import { getProjectContent } from "../data/projects-content";
import { github } from "../assets";
import { styles } from "../styles";

const localized = (value, lang) =>
  typeof value === "object" && value != null ? value[lang] ?? value.en ?? "" : value ?? "";

const formatDate = (value, locale) => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TagPill = ({ tag }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/80">
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: (tag.color ?? "#ffffff").trim() }}
    />
    {tag.name}
  </span>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  const lang = i18n.language?.startsWith("es") ? "es" : "en";
  const name = localized(project.name, lang);
  const description = localized(project.description, lang);
  const content = getProjectContent(project.id);
  const cover = content?.cover ?? project.image;
  const intro = content ? localized(content.intro, lang) : description;
  const published = formatDate(content?.date, i18n.language);
  const lastUpdated = formatDate(content?.lastUpdated, i18n.language);
  const tags = content?.tags?.length ? content.tags : project.tags ?? [];
  const repoLinks =
    content?.links?.length > 0
      ? content.links
      : project.source_code_link
        ? [{ href: project.source_code_link, label: null }]
        : [];
  const hasMeta = published || lastUpdated || tags.length > 0 || repoLinks.length > 0;

  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col overflow-hidden">
      {/* Soft blue wash — case-study atmosphere behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] sm:h-[620px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 20% 0%, rgba(74,119,255,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 85% 15%, rgba(0,206,168,0.08) 0%, transparent 50%)",
        }}
      />

      <Navbar />

      <main className={`${styles.paddingX} relative pt-28 sm:pt-32 pb-16 max-w-5xl mx-auto w-full flex-1`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-secondary hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("projects.backToProjects")}
          </Link>

          <div className="flex flex-row items-start gap-5">
            {/* Accent rail — reading-mode cue shared with Hero */}
            <motion.div
              className="hidden sm:flex flex-col items-center mt-3 shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              aria-hidden
            >
              <div className="w-4 h-4 rounded-full bg-accent-blue shadow-[0_0_20px_rgba(74,119,255,0.5)]" />
              <div className="w-1 h-[320px] md:h-[420px] blue-gradient" />
            </motion.div>

            <div className="min-w-0 flex-1">
              <h1
                className={`text-white font-black text-3xl sm:text-4xl md:text-5xl blue-text-gradient ${
                  hasMeta ? "mb-4" : "mb-8"
                }`}
              >
                {name}
              </h1>

              {hasMeta && (
                <div className="flex flex-col gap-3 mb-8">
                  {(published || lastUpdated) && (
                    <p className="flex flex-wrap gap-x-4 gap-y-1 text-secondary/80 text-sm">
                      {published && (
                        <span>
                          {t("projects.published")}{" "}
                          <time dateTime={content.date}>{published}</time>
                        </span>
                      )}
                      {lastUpdated && (
                        <span>
                          {t("projects.lastUpdated")}{" "}
                          <time dateTime={content.lastUpdated}>{lastUpdated}</time>
                        </span>
                      )}
                    </p>
                  )}
                  {(tags.length > 0 || repoLinks.length > 0) && (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5 min-w-0">
                        {tags.map((tag) => (
                          <TagPill key={tag.name} tag={tag} />
                        ))}
                      </div>
                      {repoLinks.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 shrink-0 ml-auto">
                          {repoLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <img src={github} alt="" className="w-4 h-4" />
                              {link.label ? localized(link.label, lang) : t("projects.viewCode")}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <section className="text-white/90 space-y-10">
                {cover && (
                  <div className="relative -mx-2 sm:mx-0 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={cover}
                      alt={name}
                      className="w-full aspect-[16/9] object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"
                    />
                  </div>
                )}

                {intro && (
                  <p className="text-secondary text-[17px] leading-relaxed max-w-3xl">{intro}</p>
                )}

                {content?.highlights?.length > 0 && (
                  <ul className="space-y-2 max-w-3xl">
                    {content.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-secondary text-[15px] leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0" />
                        {localized(item, lang)}
                      </li>
                    ))}
                  </ul>
                )}

                {content?.sections?.map((section) => (
                  <div key={section.id} className="max-w-3xl space-y-3">
                    <h2 className="text-white font-semibold text-xl sm:text-2xl">
                      {localized(section.title, lang)}
                    </h2>
                    <p className="text-secondary text-[16px] leading-relaxed">
                      {localized(section.body, lang)}
                    </p>
                    {section.images?.length > 0 && (
                      <div className="grid gap-4 pt-2">
                        {section.images.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt=""
                            className="w-full rounded-xl border border-white/10"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {content?.disclaimer && (
                  <p className="max-w-3xl text-secondary/60 text-xs leading-relaxed pt-4 border-t border-white/5">
                    {localized(content.disclaimer, lang)}
                  </p>
                )}
              </section>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
