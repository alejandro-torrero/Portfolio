import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const formRef = useRef();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
          alert(t("contact.successMessage"));
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert(t("contact.errorMessage"));
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "between", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/5"
      >
        <p className={styles.sectionSubText}>{t("contact.sectionSubText")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.sectionHeadText")}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.nameLabel")}
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.namePlaceholder")}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#4a77ff]/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.emailLabel")}
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.emailPlaceholder")}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#4a77ff]/50 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.messageLabel")}
            </span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.messagePlaceholder")}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#4a77ff]/50 font-medium transition-colors resize-none"
            />
          </label>

          <button
            type="submit"
            className="bg-[#4a77ff] hover:bg-[#3d66e6] py-3 px-8 rounded-xl w-fit text-white font-bold shadow-lg shadow-[#4a77ff]/20 transition-colors"
          >
            {loading ? t("contact.sendingButton") : t("contact.submitButton")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper("contact", Contact);
