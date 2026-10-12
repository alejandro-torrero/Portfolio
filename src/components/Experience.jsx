import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { experiences } from "../data";
import SectionHeader from "./SectionHeader";

const localized = (value, lang) =>
  typeof value === "object" && value != null ? value[lang] ?? value.en ?? "" : value ?? "";

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC off-by-one). */
const parseLocalDate = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(y, m - 1, d || 1);
};

const formatMonthYear = (date, locale) =>
  date.toLocaleDateString(locale, { month: "short", year: "numeric" });

const getDurationMonths = (dateStart, dateEnd) => {
  const start = parseLocalDate(dateStart);
  if (!start) return 0;
  const end = parseLocalDate(dateEnd) ?? new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
};

const formatDuration = (months, t) => {
  if (months < 1) return t("work.durationMonths", { count: 1 });
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts = [];
  if (years > 0) parts.push(t("work.durationYears", { count: years }));
  if (rem > 0 || years === 0) parts.push(t("work.durationMonths", { count: rem || months }));
  return parts.join(" ");
};

const ExperienceCard = ({ experience, lang, index }) => {
  const { t, i18n } = useTranslation();
  const title = localized(experience.title, lang);
  const company = experience.company_name;
  const points = localized(experience.points, lang);
  const pointList = Array.isArray(points) ? points : [];

  const start = parseLocalDate(experience.dateStart);
  const end = parseLocalDate(experience.dateEnd);
  const locale = i18n.language?.startsWith("es") ? "es" : "en";
  const dateLabel = start
    ? `${formatMonthYear(start, locale)} - ${end ? formatMonthYear(end, locale) : t("work.today")}`
    : "";
  const duration = start ? formatDuration(getDurationMonths(experience.dateStart, experience.dateEnd), t) : null;

  return (
    <motion.li variants={fadeIn("up", "spring", index * 0.15, 0.75)} className="relative pl-10 sm:pl-14">
      <span
        className={`absolute left-[7px] sm:left-[15px] top-8 w-[18px] h-[18px] rounded-full border-4 border-primary ${
          experience.current ? "bg-accent-blue shadow-[0_0_16px_rgba(74,119,255,0.7)]" : "bg-white/30"
        }`}
        aria-hidden
      />
      <article className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-7 transition-colors hover:border-white/20">
        <header className="flex flex-wrap items-start gap-4">
          <a
            href={experience.companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border border-white/10"
            style={{ backgroundColor: experience.iconBg }}
            aria-label={company}
          >
            <img src={experience.icon} alt="" className="w-[70%] h-[70%] object-contain" />
          </a>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-xl leading-snug">{title}</h3>
            <a
              href={experience.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white text-sm transition-colors"
            >
              {company}
            </a>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {experience.current && (
              <span className="rounded-full bg-accent-blue/15 border border-accent-blue/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-blue">
                {t("work.current")}
              </span>
            )}
            {dateLabel && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-secondary whitespace-nowrap">
                {dateLabel}
              </span>
            )}
            {duration && (
              <span className="text-[11px] text-secondary/80 whitespace-nowrap">{duration}</span>
            )}
          </div>
        </header>

        <ul className="mt-5 space-y-2">
          {pointList.map((point, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-white/85">
              <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-accent-blue/70" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        {experience.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </motion.li>
  );
};

const Experience = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <>
      <SectionHeader subText={t("work.sectionSubText")} headText={t("work.sectionHeadText")} />

      <ol className="relative mt-12 max-w-4xl flex flex-col gap-6">
        <span
          className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-blue via-white/15 to-transparent"
          aria-hidden
        />
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.company_name}
            index={index}
            experience={experience}
            lang={lang}
          />
        ))}
      </ol>
    </>
  );
};

export default SectionWrapper("work", Experience);
