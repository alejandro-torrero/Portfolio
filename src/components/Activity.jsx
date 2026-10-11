import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import SectionHeader from "./SectionHeader";
import GitHubContributions from "./GitHubContributions";
import LeetCode from "./LeetCode";

const TABS = [
  { id: "github", labelKey: "activity.tabGithub", Panel: GitHubContributions },
  { id: "leetcode", labelKey: "activity.tabLeetcode", Panel: LeetCode },
];

const Activity = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(TABS[0].id);
  const [visited, setVisited] = useState(() => new Set([TABS[0].id]));

  const selectTab = (id) => {
    setActive(id);
    setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  return (
    <>
      <SectionHeader
        subText={t("activity.sectionSubText")}
        headText={t("activity.sectionHeadText")}
        description={t("activity.description")}
      />

      <motion.div variants={fadeIn("", "", 0.15, 1)} className="mt-10">
        <div role="tablist" className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`activity-tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`activity-panel-${tab.id}`}
              onClick={() => selectTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                active === tab.id ? "bg-accent-blue text-white" : "text-secondary hover:text-white"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[520px]">
          {TABS.filter((tab) => visited.has(tab.id)).map(({ id, Panel }) => (
            <div
              key={id}
              role="tabpanel"
              id={`activity-panel-${id}`}
              aria-labelledby={`activity-tab-${id}`}
              hidden={active !== id}
            >
              <Panel />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper("activity", Activity);
