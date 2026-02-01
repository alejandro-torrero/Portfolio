import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../data";
import { menu, close } from "../assets";
import { profilePhoto } from "../assets";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, toggleLocale } = useLanguage();

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary/95 backdrop-blur-sm border-b border-white/5`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={profilePhoto}
            alt="logo"
            className="w-9 h-9 object-contain rounded-full ring-2 ring-white/10"
          />
          <div>
            <p className="text-white text-[18px] font-bold cursor-pointer">
              {t("brand.name")}
            </p>
            <span className="sm:block hidden text-[12px] text-secondary">
              {t("brand.role")}
            </span>
          </div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.titleKey ? "text-white" : "text-secondary"
              } hover:text-white text-[16px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(link.titleKey)}
            >
              <a href={`#${link.id}`}>{t(`nav.${link.titleKey}`)}</a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggleLocale}
              className="text-secondary hover:text-white font-medium text-sm px-3 py-1.5 rounded-md border border-secondary/50 hover:border-white/30 transition-colors"
              aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            >
              {locale === "en" ? "ES" : "EN"}
            </button>
          </li>
        </ul>
      </div>

      <div className="sm:hidden flex justify-end items-center gap-3">
        <button
          type="button"
          onClick={toggleLocale}
          className="text-secondary hover:text-white text-sm font-medium px-2 py-1 rounded border border-secondary/50"
          aria-label={locale === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
        >
          {locale === "en" ? "ES" : "EN"}
        </button>
        <img
          src={menuOpen ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <div
          className={`${
            !menuOpen ? "hidden" : "flex"
          } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl bg-tertiary/95 backdrop-blur border border-white/5`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-medium cursor-pointer text-[16px] transition-colors ${
                  active === nav.titleKey ? "text-white" : "text-secondary hover:text-white"
                }`}
                onClick={() => {
                  setMenuOpen(false);
                  setActive(nav.titleKey);
                }}
              >
                <a href={`#${nav.id}`}>{t(`nav.${nav.titleKey}`)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
