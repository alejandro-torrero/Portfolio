import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { styles } from "../styles";
import { profile, projects } from "../data";
import { github, LinkedinIcon } from "../assets";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const yearsSince = (isoDate) =>
  Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / (365.25 * 24 * 3600 * 1000)));

const socialClass =
  "w-11 h-11 rounded-xl flex items-center justify-center border border-white/15 bg-primary/70 backdrop-blur-md hover:border-accent-blue/60 hover:bg-white/[0.08] transition-colors";

const Hero = () => {
  const { t } = useTranslation();

  const facts = [
    { value: t("hero.factRoleValue"), label: t("hero.factRoleLabel") },
    { value: `${yearsSince(profile.careerStart)}+`, label: t("hero.factYearsLabel") },
    { value: projects.length, label: t("hero.factProjectsLabel") },
  ];

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden flex items-center">
      <div className={`${styles.paddingX} relative w-full max-w-7xl mx-auto pt-28 pb-32 flex flex-row items-start gap-5`}>
        <motion.div
          className="hidden sm:flex flex-col justify-center items-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="w-5 h-5 rounded-full bg-accent-blue shadow-[0_0_20px_rgba(74,119,255,0.5)]" />
          <div className="w-1 h-[420px] blue-gradient" />
        </motion.div>

        <motion.div className="max-w-[640px]" variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-accent-blue font-semibold text-xs sm:text-sm tracking-wider uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            {t("hero.tagline")}
          </motion.p>
          <motion.h1 variants={item} className={`text-white ${styles.heroHeadText}`}>
            {t("hero.greeting")}{" "}
            <span className="text-accent-blue drop-shadow-[0_0_30px_rgba(74,119,255,0.4)]">
              {t("hero.name")}
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-[17px] sm:text-[19px] text-secondary leading-relaxed max-w-[560px]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold text-sm shadow-lg shadow-accent-blue/30 hover:shadow-accent-blue/50 hover:bg-[#5c85ff] transition-all duration-300"
            >
              {t("hero.ctaWork")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-accent-blue/60 hover:bg-white/5 transition-all duration-300"
            >
              {t("hero.ctaContact")}
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-secondary hover:text-white font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                </svg>
                {t("hero.ctaResume")}
              </a>
            )}
            <div className="flex items-center gap-2 sm:ml-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialClass}>
                <img src={github} alt="" className="w-5 h-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
                <img src={LinkedinIcon} alt="" className="w-5 h-5" />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className={socialClass}>
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 grid grid-cols-3 max-w-[560px] rounded-2xl border border-white/10 bg-primary/60 backdrop-blur-md divide-x divide-white/10"
          >
            {facts.map((fact) => (
              <div key={fact.label} className="px-4 py-4 sm:px-5">
                <dt className="text-secondary text-[11px] sm:text-xs uppercase tracking-wider">{fact.label}</dt>
                <dd className="mt-1 text-white font-semibold text-sm sm:text-lg leading-tight">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center items-center">
        <a href="#projects" className="group" aria-label="Scroll to projects">
          <div className="w-[30px] h-[54px] rounded-3xl border-[3px] border-secondary/60 group-hover:border-accent-blue/60 flex justify-center items-start p-2 transition-colors">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
