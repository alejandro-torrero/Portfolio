import { LinkedinIcon } from "../assets";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="h-[72px] w-full px-6 flex justify-between items-center border-t border-white/5 bg-primary">
      <p className="text-secondary text-sm">{t("footer.name")}</p>
      <div
        className="flex flex-row gap-2 items-center p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        onClick={() => window.open("https://www.linkedin.com/in/atorrero/")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open("https://www.linkedin.com/in/atorrero/");
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="LinkedIn profile"
      >
        <img src={LinkedinIcon} alt="LinkedIn" className="h-7 w-7" />
        <span className="text-secondary text-sm hidden sm:inline">LinkedIn</span>
      </div>
    </footer>
  );
};

export default Footer;
