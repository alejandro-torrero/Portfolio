import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { discoveries } from "../data";
import { getDiscoveryContent } from "../data/discoveries-content";
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

const DiscoveryDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const discovery = discoveries.find((d) => d.id === id);

  if (!discovery) return <Navigate to="/discoveries" replace />;

  const lang = i18n.language?.startsWith("es") ? "es" : "en";
  const name = localized(discovery.name, lang);
  const description = localized(discovery.description, lang);
  const content = getDiscoveryContent(discovery.id);
  const cover = content?.cover ?? discovery.image;
  const intro = content ? localized(content.intro, lang) : description;
  const published = formatDate(content?.date, i18n.language);
  const lastUpdated = formatDate(content?.lastUpdated, i18n.language);
  const tags = content?.tags?.length ? content.tags : discovery.tags ?? [];
  const credits = content?.credits ?? discovery.credits;
  const creditNote = credits?.note ? localized(credits.note, lang) : null;
  const hasMeta = published || lastUpdated || tags.length > 0;

  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className={`${styles.paddingX} pt-28 sm:pt-32 pb-16 max-w-5xl mx-auto w-full flex-1`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/discoveries"
            className="inline-flex items-center gap-2 text-secondary hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("discovery.backToDiscoveries")}
          </Link>

          <h1
            className={`text-white font-black text-3xl sm:text-4xl md:text-5xl blue-text-gradient ${
              hasMeta || credits ? "mb-4" : "mb-8"
            }`}
          >
            {name}
          </h1>

          {credits?.creators?.length > 0 && (
            <div className="mb-6 max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[12px] uppercase tracking-wider text-secondary mb-2">
                {t("discovery.creditsHeading")}
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                {t("discovery.creditsBy")}{" "}
                {credits.creators.map((creator, i) => (
                  <span key={creator.name}>
                    {i > 0 && ", "}
                    {creator.url ? (
                      <a
                        href={creator.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-blue hover:underline font-medium"
                      >
                        {creator.name}
                      </a>
                    ) : (
                      <span className="font-medium">{creator.name}</span>
                    )}
                  </span>
                ))}
              </p>
              {creditNote && (
                <p className="mt-1.5 text-secondary text-sm leading-relaxed">{creditNote}</p>
              )}
            </div>
          )}

          {hasMeta && (
            <div className="flex flex-col gap-3 mb-8">
              {(published || lastUpdated) && (
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-secondary/80 text-sm">
                  {published && (
                    <span>
                      {t("discovery.published")}{" "}
                      <time dateTime={content.date}>{published}</time>
                    </span>
                  )}
                  {lastUpdated && (
                    <span>
                      {t("discovery.lastUpdated")}{" "}
                      <time dateTime={content.lastUpdated}>{lastUpdated}</time>
                    </span>
                  )}
                </p>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <TagPill key={tag.name} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          )}

          <section className="text-white/90 space-y-10">
            {cover && (
              <img
                src={cover}
                alt={name}
                className="w-full aspect-[16/9] object-cover rounded-2xl border border-white/10"
              />
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

            {(content?.links?.length > 0 || discovery.original_link) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {content?.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {localized(link.label, lang)}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
                {!content?.links?.length && discovery.original_link && (
                  <a
                    href={discovery.original_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {t("discovery.originalProject")}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            )}

            {content?.disclaimer && (
              <p className="max-w-3xl text-secondary/60 text-xs leading-relaxed pt-4 border-t border-white/5">
                {localized(content.disclaimer, lang)}
              </p>
            )}
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default DiscoveryDetail;
