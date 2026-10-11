import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { discoveries } from "../data";

const localized = (value, lang) =>
  typeof value === "object" && value != null ? value[lang] ?? value.en ?? "" : value ?? "";

export const useLocalizedDiscoveries = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("es") ? "es" : "en";
  return discoveries.map((d) => ({
    ...d,
    name: localized(d.name, lang),
    description: localized(d.description, lang),
    creditNote: d.credits?.note ? localized(d.credits.note, lang) : null,
  }));
};

const TagPill = ({ tag }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/80">
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tag.color.trim() }} />
    {tag.name}
  </span>
);

const creatorLabel = (creators) => {
  if (!creators?.length) return null;
  return creators.map((c) => c.name).join(", ");
};

const DiscoveryCard = ({
  name,
  description,
  tags,
  image,
  original_link,
  credits,
  creditNote,
  link,
}) => {
  const { t } = useTranslation();
  const hasLink = Boolean(link);
  const creators = creatorLabel(credits?.creators);

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
            {t("discovery.detailsSoon")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-accent-blue transition-colors">
          {name}
        </h3>
        {(creators || creditNote) && (
          <p className="mt-1.5 text-[13px] text-secondary/90">
            {t("discovery.creditsBy")}{" "}
            <span className="text-white/80">{creditNote || creators}</span>
          </p>
        )}
        <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-3">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagPill key={`${name}-${tag.name}`} tag={tag} />
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          {hasLink ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue group-hover:gap-2.5 transition-all">
              {t("discovery.viewDiscovery")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          ) : (
            <span />
          )}
          {original_link && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(original_link, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t("discovery.originalProject")}
              <span aria-hidden>↗</span>
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

export default DiscoveryCard;
