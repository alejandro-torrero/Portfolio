import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { certificates } from "../data";
import SectionHeader from "./SectionHeader";

const CertificateCard = ({ index, name, issuer, instructor, date, hours, url, image, tags }) => {
  const { t, i18n } = useTranslation();
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(i18n.language, {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up", "spring", index * 0.12, 0.75)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(74,119,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-white">
        <img
          src={image}
          alt={t("certificates.imageAlt", { name })}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-white font-semibold text-[17px] leading-snug group-hover:text-accent-blue transition-colors">
          {name}
        </h3>
        <p className="mt-1.5 text-secondary text-sm">
          <span className="font-semibold text-[#c084fc]">{issuer}</span> · {instructor}
        </p>
        <p className="mt-1 text-secondary/80 text-xs">
          {formattedDate} · {t("certificates.hours", { count: hours })}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
          {t("certificates.viewCredential")}
          <span aria-hidden>↗</span>
        </span>
      </div>
    </motion.a>
  );
};

const Certificates = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        subText={t("certificates.sectionSubText")}
        headText={t("certificates.sectionHeadText")}
        description={t("certificates.description")}
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 min-[880px]:grid-cols-3 gap-5">
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.url} index={index} {...cert} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("certificates", Certificates);
