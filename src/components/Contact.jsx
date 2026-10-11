import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, staggerContainer } from "../utils/motion";
import { useTranslation } from "react-i18next";
import { LinkedinIcon, github } from "../assets";
import { profile, leetcodeProfile } from "../data";

const leetcodeUrl = `https://leetcode.com/u/${leetcodeProfile.username}/`;

const FEEDBACK_TYPES = { success: "success", error: "error" };

/** Floating gradient orbs + ring graphic for the contact section */
const ContactGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl opacity-60" aria-hidden>
    {/* Animated gradient orbs */}
    <motion.div
      className="absolute w-48 h-48 rounded-full opacity-30 blur-3xl"
      style={{
        background: "linear-gradient(135deg, #4a77ff 0%, #00cea8 100%)",
      }}
      animate={{
        x: [0, 24, 0],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-40 h-40 rounded-full opacity-25 blur-2xl"
      style={{
        background: "linear-gradient(225deg, #f272c8 0%, #4a77ff 100%)",
      }}
      animate={{
        x: [0, -20, 0],
        y: [0, 16, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.div
      className="absolute w-32 h-32 rounded-full opacity-20 blur-2xl"
      style={{
        background: "linear-gradient(180deg, #00cea8 0%, #4a77ff 50%)",
      }}
      animate={{
        x: [0, 12, 0],
        y: [0, 24, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    {/* Central ring */}
    <motion.div
      className="absolute w-36 h-36 rounded-full border-2 border-white/10"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute w-28 h-28 rounded-full border border-white/20"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Contact = () => {
  const formRef = useRef();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Alejandro Torrero",
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showFeedback(FEEDBACK_TYPES.success, t("contact.successMessage"));
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showFeedback(FEEDBACK_TYPES.error, t("contact.errorMessage"));
        }
      );
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const inputBase =
    "w-full bg-white/[0.03] py-4 px-5 rounded-xl outline-none border border-white/10 text-white placeholder:text-white/40 font-medium transition-all duration-300 focus:border-[#4a77ff]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#4a77ff]/20";

  const linkRow =
    "group flex items-center gap-4 rounded-2xl border border-white/10 bg-primary/70 backdrop-blur-md px-4 py-3.5 transition-colors hover:border-accent-blue/50";
  const linkIcon =
    "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/10";

  return (
    <div className="xl:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch overflow-hidden">
      {/* Left column – form */}
      <motion.div
        variants={slideIn("left", "between", 0.2, 1)}
        className="flex flex-col min-h-[420px]"
      >
        {/* Card wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/20 flex-1 flex flex-col">
          {/* Translucent glass – form + headings; stars visible through */}
          <div
            className="relative p-8 sm:p-10 rounded-3xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <p className={`${styles.sectionSubText} section-sub-accent`}>{t("contact.sectionSubText")}</p>
            <h3 className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
              {t("contact.sectionHeadText")}
            </h3>
            <p className="text-secondary/90 text-sm mt-3 max-w-md">
              {t("contact.sectionDescription")}
            </p>

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-6"
              variants={staggerContainer(0.08, 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeIn("up", "tween", 0, 0.35)} className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-white/90 font-medium text-sm">
                  {t("contact.nameLabel")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  className={inputBase}
                  required
                />
              </motion.div>
              <motion.div variants={fadeIn("up", "tween", 0, 0.35)} className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-white/90 font-medium text-sm">
                  {t("contact.emailLabel")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  className={inputBase}
                  required
                />
              </motion.div>
              <motion.div variants={fadeIn("up", "tween", 0, 0.35)} className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-white/90 font-medium text-sm">
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  className={`${inputBase} resize-none min-h-[120px]`}
                  required
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.div
                    key={feedback.type}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`rounded-xl px-4 py-3 text-sm font-medium ${
                      feedback.type === FEEDBACK_TYPES.success
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={fadeIn("up", "tween", 0, 0.35)}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-3.5 rounded-xl font-bold text-white overflow-hidden bg-gradient-to-r from-[#4a77ff] to-[#5b8aff] shadow-lg shadow-[#4a77ff]/25 hover:shadow-[#4a77ff]/40 transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("contact.sendingButton")}
                    </span>
                  ) : (
                    t("contact.submitButton")
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Right column – direct links */}
      <motion.div
        variants={slideIn("right", "between", 0.2, 1)}
        className="relative min-h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]"
      >
        <ContactGraphic />
        <div className="relative h-full flex flex-col justify-center gap-4 p-8 sm:p-10">
          <h4 className="text-white font-semibold text-xl">{t("contact.reachDirectly")}</h4>
          <p className="text-secondary text-sm -mt-2 mb-2">{t("contact.reachDirectlyDescription")}</p>

          <div className={linkRow}>
            <span className={linkIcon}>
              <svg className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <a href={`mailto:${profile.email}`} className="flex-1 min-w-0">
              <p className="text-secondary text-xs uppercase tracking-wider">Email</p>
              <p className="text-white text-sm font-medium truncate">{profile.email}</p>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? t("contact.copied") : t("contact.copyEmail")}
            </button>
          </div>

          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkRow}>
            <span className={linkIcon}>
              <img src={LinkedinIcon} alt="" className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-secondary text-xs uppercase tracking-wider">LinkedIn</p>
              <p className="text-white text-sm font-medium truncate">{profile.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</p>
            </div>
            <span className="text-secondary group-hover:text-white transition-colors" aria-hidden>↗</span>
          </a>

          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkRow}>
            <span className={linkIcon}>
              <img src={github} alt="" className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-secondary text-xs uppercase tracking-wider">GitHub</p>
              <p className="text-white text-sm font-medium truncate">{profile.github.replace(/^https?:\/\//, "")}</p>
            </div>
            <span className="text-secondary group-hover:text-white transition-colors" aria-hidden>↗</span>
          </a>

          <a href={leetcodeUrl} target="_blank" rel="noopener noreferrer" className={linkRow}>
            <span className={linkIcon}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#FFA116" aria-hidden>
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-secondary text-xs uppercase tracking-wider">LeetCode</p>
              <p className="text-white text-sm font-medium truncate">{leetcodeUrl.replace(/^https?:\/\//, "")}</p>
            </div>
            <span className="text-secondary group-hover:text-white transition-colors" aria-hidden>↗</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper("contact", Contact);
