import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../data";
import { fadeIn, textVariant } from "../utils/motion";

import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  link,
}) => {
  const nav = useNavigate();
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <motion.div
        whileHover={{ scale: 1.05, cursor: "pointer" }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] h-[490px] w-full"
        onClick={() => {
          nav(link);
        }}
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          {source_code_link != null && (
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              className={`border-solid border-[1px] rounded-lg px-3`}
              key={`${name}-${tag.name}`}
              style={{ borderColor: tag.color }}
            >
              <p className={`text-[15px]`} style={{ color: tag.color }}>
                {tag.name}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const nav = useNavigate();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
        >
          The following projects highlight my skills and experience through
          real-world applications. Each project includes a brief description,
          along with links to the code repositories and live demos. These
          showcase my ability to tackle complex challenges, work across various
          technologies, and manage projects efficiently.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="border border-[#4a77ff] text-[#4a77ff] font-semibold bg-transparent hover:bg-[#082540] hover:text-white transition-colors duration-300 px-4 py-2 rounded"
          onClick={() => {
            nav("/projects")
          }}
        >
          More ...
        </button>
      </div>
    </>
  );
};

export default SectionWrapper("projects", Projects);
