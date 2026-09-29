import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useTranslation } from "react-i18next";
import { leetcodeProfile } from "../data";

// Public LeetCode stats mirrors (both expose CORS). First one that answers wins.
const STATS_APIS = [
  (u) => `https://leetcode-api-faisalshohag.vercel.app/${u}`,
  (u) => `https://leetcode-stats.tashif.codes/${u}`,
];

// LeetCode brand palette
const COLORS = {
  easy: "#00b8a3",
  medium: "#ffc01e",
  hard: "#ff375f",
};

// Heatmap levels (LeetCode-style greens on dark bg)
const LEVEL_COLORS = [
  "rgb(22, 27, 34)",
  "rgba(44, 187, 93, 0.30)",
  "rgba(44, 187, 93, 0.55)",
  "rgba(44, 187, 93, 0.80)",
  "rgb(44, 187, 93)",
];

const DAY = 86400;
const WEEKS = 53;

function findAll(list) {
  return Array.isArray(list) ? list.find((d) => d?.difficulty === "All") : undefined;
}

/** Normalize the two API shapes into one. */
function normalize(raw) {
  if (!raw || typeof raw.totalSolved !== "number") throw new Error("Bad payload");

  const totalAll = findAll(raw.totalSubmissions) ?? findAll(raw.matchedUserStats?.totalSubmissionNum);
  const acAll = findAll(raw.matchedUserStats?.acSubmissionNum);

  let acceptanceRate = typeof raw.acceptanceRate === "number" ? raw.acceptanceRate : null;
  if (acceptanceRate === null && acAll?.submissions && totalAll?.submissions) {
    acceptanceRate = (acAll.submissions / totalAll.submissions) * 100;
  }

  const calendar = {};
  for (const [k, v] of Object.entries(raw.submissionCalendar ?? {})) {
    const ts = Number(k);
    const n = Number(v);
    if (Number.isFinite(ts) && Number.isFinite(n)) calendar[ts] = n;
  }

  return {
    totalSolved: raw.totalSolved,
    totalQuestions: raw.totalQuestions ?? null,
    easySolved: raw.easySolved ?? 0,
    totalEasy: raw.totalEasy ?? null,
    mediumSolved: raw.mediumSolved ?? 0,
    totalMedium: raw.totalMedium ?? null,
    hardSolved: raw.hardSolved ?? 0,
    totalHard: raw.totalHard ?? null,
    ranking: raw.ranking ?? null,
    acceptanceRate,
    totalSubmissions: totalAll?.submissions ?? null,
    calendar,
    recentSubmissions: Array.isArray(raw.recentSubmissions) ? raw.recentSubmissions : [],
  };
}

function useLeetCodeStats(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      let lastErr = null;
      for (const build of STATS_APIS) {
        try {
          const res = await fetch(build(username));
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const normalized = normalize(json);
          if (!cancelled) setData(normalized);
          return;
        } catch (err) {
          lastErr = err;
        }
      }
      if (!cancelled) setError(lastErr ?? new Error("Failed to load"));
    })().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading, error };
}

function levelFor(count) {
  if (!count) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** Build a 7 x WEEKS grid ending today (UTC), aligned with LeetCode's UTC-midnight keys. */
function buildHeatmap(calendar) {
  const now = new Date();
  const todayUtc = Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 1000
  );
  const todayDow = new Date(todayUtc * 1000).getUTCDay();
  const start = todayUtc - (todayDow + (WEEKS - 1) * 7) * DAY;

  const rows = Array.from({ length: 7 }, () => []);
  const monthLabels = [];
  let lastMonth = -1;

  for (let col = 0; col < WEEKS; col++) {
    for (let dow = 0; dow < 7; dow++) {
      const ts = start + (col * 7 + dow) * DAY;
      if (ts > todayUtc) {
        rows[dow].push(null);
        continue;
      }
      const date = new Date(ts * 1000);
      rows[dow].push({ ts, date, count: calendar[ts] ?? 0 });
      if (dow === 0) {
        const m = date.getUTCMonth();
        if (m !== lastMonth) {
          monthLabels.push({ col, date });
          lastMonth = m;
        }
      }
    }
  }

  // Avoid two labels colliding at the very start of the grid.
  if (monthLabels.length > 1 && monthLabels[1].col - monthLabels[0].col < 3) {
    monthLabels.shift();
  }

  return { rows, cols: WEEKS, monthLabels };
}

function SubmissionHeatmap({ calendar }) {
  const { t, i18n } = useTranslation();
  const { rows, cols, monthLabels } = useMemo(() => buildHeatmap(calendar), [calendar]);

  const labelCells = [];
  for (let col = 0; col < cols; col++) {
    const info = monthLabels.find((m) => m.col === col);
    labelCells.push(
      <div
        key={`label-${col}`}
        className="flex items-end justify-start pb-0.5 text-[10px] sm:text-xs text-secondary/80 font-medium whitespace-nowrap"
      >
        {info
          ? info.date.toLocaleDateString(i18n.language, { month: "short", timeZone: "UTC" })
          : ""}
      </div>
    );
  }

  const cells = [];
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = rows[row][col];
      if (!cell) {
        cells.push(<div key={`${row}-${col}`} className="w-full h-full" aria-hidden />);
        continue;
      }
      const dateStr = cell.date.toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
      const countStr =
        cell.count === 0
          ? t("leetcode.noSubmissions")
          : cell.count === 1
            ? t("leetcode.submissionCount")
            : t("leetcode.submissionsCount", { count: cell.count });
      cells.push(
        <div
          key={`${row}-${col}`}
          className="rounded-[2px] w-full h-full min-h-[6px]"
          style={{ backgroundColor: LEVEL_COLORS[levelFor(cell.count)] }}
          title={`${countStr} · ${dateStr}`}
          aria-hidden
        />
      );
    }
  }

  return (
    <div className="w-full" style={{ minHeight: "100px" }}>
      <div
        className="grid w-full gap-x-[3px] gap-y-[2px]"
        style={{
          gridTemplateRows: `auto repeat(${rows.length}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          aspectRatio: `${cols} / ${rows.length + 1}`,
        }}
      >
        {labelCells}
        {cells}
      </div>
    </div>
  );
}

function SolvedRing({ easy, medium, hard, total, totalQuestions, solvedLabel, ofLabel }) {
  const size = 160;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const sum = easy + medium + hard;
  const gap = sum > 1 ? 4 : 0;

  const segments = [
    { v: easy, color: COLORS.easy },
    { v: medium, color: COLORS.medium },
    { v: hard, color: COLORS.hard },
  ];

  let offset = 0;
  const arcs = segments
    .filter((s) => s.v > 0)
    .map((s, i) => {
      const len = (s.v / (sum || 1)) * c;
      const el = (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${Math.max(len - gap, 0.5)} ${c - Math.max(len - gap, 0.5)}`}
          strokeDashoffset={-offset}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      );
      offset += len;
      return el;
    });

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {arcs}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-white font-black text-4xl leading-none">{total.toLocaleString()}</span>
        <span className="text-secondary text-xs uppercase tracking-wider mt-1">{solvedLabel}</span>
        {totalQuestions ? (
          <span className="text-secondary/70 text-[11px] mt-0.5">{ofLabel}</span>
        ) : null}
      </div>
    </div>
  );
}

function DifficultyBar({ label, solved, total, color }) {
  const pct = total ? Math.min(100, (solved / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-semibold" style={{ color }}>
          {label}
        </span>
        <span className="text-sm text-white font-medium">
          {solved.toLocaleString()}
          {total ? <span className="text-secondary/70 font-normal"> / {total.toLocaleString()}</span> : null}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, solved > 0 ? 1.5 : 0)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
      <p className="text-secondary text-[11px] uppercase tracking-wider">{label}</p>
      <p className="text-white font-bold text-lg sm:text-xl mt-0.5 leading-tight">{value ?? "—"}</p>
    </div>
  );
}

function RecentAccepted({ submissions }) {
  const { t, i18n } = useTranslation();

  const items = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const s of submissions) {
      if (s?.statusDisplay !== "Accepted" || !s.titleSlug || seen.has(s.titleSlug)) continue;
      seen.add(s.titleSlug);
      out.push(s);
      if (out.length >= 6) break;
    }
    return out;
  }, [submissions]);

  if (!items.length) return null;

  return (
    <div className="mt-8">
      <p className="text-secondary text-xs uppercase tracking-wider font-medium mb-3">
        {t("leetcode.recentTitle")}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((s) => {
          const date = new Date(Number(s.timestamp) * 1000);
          return (
            <li key={s.titleSlug}>
              <a
                href={`https://leetcode.com/problems/${s.titleSlug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-sm transition-colors hover:border-[#ffa116]/40 hover:bg-white/[0.06]"
              >
                <span className="text-white truncate">{String(s.title).trim()}</span>
                <span className="text-secondary/80 text-[11px] whitespace-nowrap shrink-0">
                  {s.lang ? <span className="mr-2">{s.lang}</span> : null}
                  {Number.isFinite(date.getTime())
                    ? date.toLocaleDateString(i18n.language, { month: "short", day: "numeric" })
                    : ""}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const LeetCodeCard = ({ username }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useLeetCodeStats(username);
  const profileUrl = `https://leetcode.com/u/${username}/`;

  const activeDays = useMemo(
    () => (data ? Object.values(data.calendar).filter((n) => n > 0).length : null),
    [data]
  );

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {loading && <p className="text-secondary text-sm">{t("leetcode.loading")}</p>}
      {!loading && error && <p className="text-secondary/80 text-sm">{t("leetcode.error")}</p>}

      {!loading && !error && data && (
        <>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
            <div className="shrink-0">
              <SolvedRing
                easy={data.easySolved}
                medium={data.mediumSolved}
                hard={data.hardSolved}
                total={data.totalSolved}
                totalQuestions={data.totalQuestions}
                solvedLabel={t("leetcode.solved")}
                ofLabel={t("leetcode.ofTotal", {
                  total: data.totalQuestions?.toLocaleString(),
                })}
              />
            </div>

            <div className="flex-1 w-full flex flex-col gap-4">
              <DifficultyBar
                label={t("leetcode.easy")}
                solved={data.easySolved}
                total={data.totalEasy}
                color={COLORS.easy}
              />
              <DifficultyBar
                label={t("leetcode.medium")}
                solved={data.mediumSolved}
                total={data.totalMedium}
                color={COLORS.medium}
              />
              <DifficultyBar
                label={t("leetcode.hard")}
                solved={data.hardSolved}
                total={data.totalHard}
                color={COLORS.hard}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label={t("leetcode.ranking")}
              value={data.ranking ? `#${data.ranking.toLocaleString()}` : null}
            />
            <StatTile
              label={t("leetcode.acceptance")}
              value={
                typeof data.acceptanceRate === "number"
                  ? `${data.acceptanceRate.toFixed(1)}%`
                  : null
              }
            />
            <StatTile label={t("leetcode.activeDays")} value={activeDays?.toLocaleString()} />
            <StatTile
              label={t("leetcode.submissions")}
              value={data.totalSubmissions?.toLocaleString()}
            />
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block group"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-accent-cyan/90 via-accent-cyan/60 to-accent-blue/80"
                aria-hidden
              />
              <div className="pl-5 sm:pl-6">
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest mb-1">
                  <span className="text-accent-cyan">@{username}</span>
                </h3>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-secondary text-sm mb-5">
                  <span>{t("leetcode.heatmapTitle")}</span>
                  {activeDays !== null && (
                    <span className="text-accent-cyan/90 font-medium">
                      {activeDays.toLocaleString()} {t("leetcode.activeDays").toLowerCase()}
                    </span>
                  )}
                </div>
                <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/5 p-4 min-h-[120px] flex items-center justify-center">
                  <SubmissionHeatmap calendar={data.calendar} />
                </div>
                <p className="mt-4 text-secondary text-xs sm:text-sm">
                  {t("leetcode.openProfile")}
                </p>
              </div>
            </div>
          </a>

          <RecentAccepted submissions={data.recentSubmissions} />
        </>
      )}
    </motion.div>
  );
};

const LeetCode = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} section-sub-accent`}>
          {t("leetcode.sectionSubText")}
        </p>
        <h2 className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
          {t("leetcode.sectionHeadText")}
        </h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        {t("leetcode.description")}
      </motion.p>

      <div className="mt-10">
        <LeetCodeCard username={leetcodeProfile.username} />
      </div>
    </>
  );
};

export default SectionWrapper("leetcode", LeetCode);
