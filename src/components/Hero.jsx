import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { styles } from "../styles";

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

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[90px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <motion.div
          className="flex flex-col justify-center items-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="w-5 h-5 rounded-full bg-[#4a77ff] shadow-[0_0_20px_rgba(74,119,255,0.5)]" />
          <div className="w-1 sm:h-[60vh] h-40 blue-gradient" />
        </motion.div>

        <motion.div
          className="max-w-[620px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={item}
            className="text-[#4a77ff] font-semibold text-sm sm:text-base tracking-wider uppercase mb-2"
          >
            {t("hero.tagline")}
          </motion.p>
          <motion.h1
            variants={item}
            className={`text-white ${styles.heroHeadText}`}
          >
            {t("hero.greeting")}{" "}
            <span className="text-[#4a77ff] drop-shadow-[0_0_30px_rgba(74,119,255,0.4)]">
              {t("hero.name")}
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="sm:bg-inherit bg-[#000322] mt-6 text-[17px] sm:text-[18px] text-secondary leading-relaxed max-w-[540px]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4a77ff] text-white font-semibold text-sm shadow-lg shadow-[#4a77ff]/30 hover:shadow-[#4a77ff]/50 hover:bg-[#5c85ff] transition-all duration-300"
            >
              {t("hero.ctaWork")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent-cyan/60 text-accent-cyan font-semibold text-sm hover:bg-accent-cyan/10 transition-all duration-300"
            >
              {t("hero.ctaContact")}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute xs:bottom-35 bottom-32 w-full flex justify-center items-center">
        <a href="#about" className="group" aria-label="Scroll to about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary/60 group-hover:border-[#4a77ff]/60 flex justify-center items-start p-2 transition-colors">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
