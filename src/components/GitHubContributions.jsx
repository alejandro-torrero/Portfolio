import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useTranslation } from "react-i18next";
import { githubAccounts } from "../data";

const CONTRIB_API = "https://gh-contributions-api.vercel.app";

// GitHub-style contribution level colors (dark theme)
const LEVEL_COLORS = [
  "rgb(22, 27, 34)",      // 0 - none
  "rgb(14, 68, 41)",      // 1
  "rgb(0, 109, 50)",      // 2
  "rgb(38, 166, 65)",     // 3
  "rgb(57, 211, 83)",     // 4
];

const currentYear = new Date().getFullYear();
const START_YEAR = 2024;
const YEAR_OPTIONS = Array.from(
  { length: currentYear - START_YEAR + 1 },
  (_, i) => START_YEAR + i
).reverse();

function useContributions(username, year) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !year) return;
    setLoading(true);
    setError(null);
    fetch(`${CONTRIB_API}/${username}/${year}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load"))))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, year]);

  return { data, loading, error };
}

function getTotalContributions(weeks) {
  if (!weeks || !weeks.length) return 0;
  let total = 0;
  for (const row of weeks) {
    if (!Array.isArray(row)) continue;
    for (const cell of row) {
      if (cell && typeof cell.count === "number") total += cell.count;
    }
  }
  return total;
}

function ContributionGrid({ weeks }) {
  if (!weeks || !weeks.length) return null;
  // API returns 7 rows (Sun–Sat), each row has ~53 entries (one per week). So data[row][col].
  const rows = weeks.length;
  const cols = Math.max(0, ...weeks.map((row) => row?.length ?? 0));
  if (cols === 0) return null;

  // Grid output: row-major order (row 0 all cols, then row 1, ...) for CSS grid
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = weeks[row]?.[col];
      const level = cell?.level ?? 0;
      const color = LEVEL_COLORS[Math.min(level, 4)];
      const count = cell?.count ?? 0;
      const title = count ? `${count} contribution${count !== 1 ? "s" : ""}` : "No contributions";
      cells.push(
        <div
          key={`${row}-${col}`}
          className="rounded-[2px] w-full h-full min-h-[6px]"
          style={{ backgroundColor: color }}
          title={title}
          aria-hidden
        />
      );
    }
  }

  return (
    <div className="w-full" style={{ minHeight: "120px" }}>
      <div
        className="grid w-full gap-[3px]"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          aspectRatio: `${cols} / ${rows}`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

const ContributionCard = ({ username, label, openProfileText, loadingLabel, year, index }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useContributions(username, year);
  const profileUrl = `https://github.com/${username}`;
  const totalContributions = data ? getTotalContributions(data) : null;

  return (
    <motion.a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="block group"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 p-6 sm:p-8 min-h-[320px] sm:min-h-[360px] transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-accent-cyan/90 via-accent-cyan/60 to-accent-blue/80" aria-hidden />
        <div className="pl-5 sm:pl-6">
          <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest mb-1 flex items-center gap-2">
            <span className="text-accent-cyan">@{username}</span>
            {label && (
              <span className="text-secondary font-normal normal-case text-sm sm:text-base hidden sm:inline">
                — {label}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-secondary text-sm mb-5">
            <span>{year}</span>
            {totalContributions !== null && (
              <span className="text-accent-cyan/90 font-medium">
                {t("githubContributions.contributionsCount", { count: totalContributions.toLocaleString() })}
              </span>
            )}
          </div>
          <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/5 p-4 min-h-[120px] flex items-center justify-center">
            {loading && (
              <span className="text-secondary text-sm">{loadingLabel}</span>
            )}
            {error && (
              <span className="text-secondary/80 text-sm">Unable to load contributions</span>
            )}
            {!loading && !error && data && <ContributionGrid weeks={data} />}
          </div>
          <p className="mt-4 text-secondary text-xs sm:text-sm">
            {openProfileText}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

const GitHubContributions = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState(currentYear);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} section-sub-accent`}>
          {t("githubContributions.sectionSubText")}
        </p>
        <h2 className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
          {t("githubContributions.sectionHeadText")}
        </h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        {t("githubContributions.description")}
      </motion.p>

      <motion.div
        variants={fadeIn("", "", 0.15, 1)}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <span className="text-secondary text-sm font-medium uppercase tracking-wider">
          {t("githubContributions.year")}:
        </span>
        <div className="flex flex-wrap gap-2">
          {YEAR_OPTIONS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                year === y
                  ? "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50"
                  : "bg-white/5 text-secondary border border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col gap-8 lg:gap-10">
        {githubAccounts.map((account, index) => (
          <ContributionCard
            key={`${account.username}-${year}`}
            username={account.username}
            label={t(account.labelKey)}
            openProfileText={t("githubContributions.openProfile")}
            loadingLabel={t("githubContributions.loading")}
            year={year}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("github", GitHubContributions);
