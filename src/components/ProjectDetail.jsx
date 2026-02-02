import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { projects } from "../data";
import { styles } from "../styles";

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  const index = projects.findIndex((p) => p.id === id);
  const raw = t("projects.list", { returnObjects: true });
  const localeList = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const name = localeList[index]?.name ?? project.name;

  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className={`${styles.padding} pt-28 pb-16 max-w-5xl mx-auto w-full flex-1`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-secondary hover:text-white font-medium text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("projects.backToProjects")}
          </Link>

          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl blue-text-gradient mb-12">
            {name}
          </h1>

          {/* Add your descriptive content for this project below.
              You have access to: project.id, project.name, project.description,
              project.image, project.tags, project.source_code_link, project.link.
              Locale name/description: name (above), localeList[index]?.description */}
          <section className="text-white/90">
            {/* Your project page content goes here */}
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
