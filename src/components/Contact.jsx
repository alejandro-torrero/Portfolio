import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, staggerContainer } from "../utils/motion";
import { useTranslation } from "react-i18next";
import { LinkedinIcon } from "../assets";

const FEEDBACK_TYPES = { success: "success", error: "error" };

/** Floating gradient orbs + ring graphic for the contact section */
const ContactGraphic = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl">
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
    {/* Message / connect icon – envelope outline */}
    <motion.svg
      className="absolute w-16 h-16 text-white/40"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <path d="M8 20L32 38L56 20" />
      <path d="M8 20V44C8 45.1 8.9 46 10 46H54C55.1 46 56 45.1 56 44V20" />
    </motion.svg>
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
          to_email: "contact@portfolio.dev",
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
      await navigator.clipboard.writeText("contact@portfolio.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const inputBase =
    "w-full bg-white/[0.03] py-4 px-5 rounded-xl outline-none border border-white/10 text-white placeholder:text-white/40 font-medium transition-all duration-300 focus:border-[#4a77ff]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#4a77ff]/20";

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
            <p className={styles.sectionSubText}>{t("contact.sectionSubText")}</p>
            <h3 className="font-black md:text-[48px] sm:text-[42px] xs:text-[36px] text-[28px] mt-2 blue-text-gradient">
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

            {/* Quick contact links */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-secondary text-sm font-medium mb-4">
                {t("contact.reachDirectly")}
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/atorrero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 hover:border-[#4a77ff]/40 hover:bg-white/[0.08] transition-colors"
                >
                  <img src={LinkedinIcon} alt="LinkedIn" className="h-5 w-5" />
                  <span className="text-sm font-medium">{t("contact.openLinkedIn")}</span>
                </motion.a>
                <motion.button
                  type="button"
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 hover:border-[#4a77ff]/40 hover:bg-white/[0.08] transition-colors"
                >
                  <svg className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {copied ? t("contact.copied") : t("contact.copyEmail")}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right column – animated graphic */}
      <motion.div
        variants={slideIn("right", "between", 0.2, 1)}
        className="relative h-[380px] lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-white/10"
      >
        <ContactGraphic />
      </motion.div>
    </div>
  );
};

export default SectionWrapper("contact", Contact);
