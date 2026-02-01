import { motion } from "framer-motion";
import { styles } from "../styles";
import { useLanguage } from "../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[90px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#4a77ff]" />
          <div className="w-1 sm:h-[60vh] h-40 blue-gradient" />
        </div>
        <div className="max-w-[620px]">
          <h1 className={`text-white ${styles.heroHeadText}`}>
            {t("hero.greeting")}{" "}
            <span className="text-[#4a77ff]">{t("hero.name")}</span>
          </h1>
          <p className="sm:bg-inherit bg-[#000322] mt-10 text-[18px] text-secondary leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
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
