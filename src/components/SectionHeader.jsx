import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const SectionHeader = ({ subText, headText, description, as: Heading = "h2", children }) => (
  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} section-sub-accent`}>{subText}</p>
        <Heading className={`${styles.sectionHeadTextGradient} blue-text-gradient mt-2`}>
          {headText}
        </Heading>
      </motion.div>
      {description && (
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {description}
        </motion.p>
      )}
    </div>
    {children}
  </div>
);

export default SectionHeader;
