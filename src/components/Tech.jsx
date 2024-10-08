import { SectionWrapper } from "../hoc";
import { technologies } from "../data";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const TechCard = ({ icon }) => {
  return (
    <div className="rounded-lg p-2 bg-[#082540] h-[112px] flex justify-center items-center">
      <img src={icon} />
    </div>
  );
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Skills</p>
        <h2 className={`${styles.sectionHeadText}`}>Tech and frameworks</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
        >
          Tech, frameworks and libraries I've used and have experience with.
          Most of them with profesional proficiency or above.
        </motion.p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-10">
        {technologies.map((tech) => (
          <div className="w-28 h-28" key={tech.name}>
            <TechCard icon={tech.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper("tech", Tech);
