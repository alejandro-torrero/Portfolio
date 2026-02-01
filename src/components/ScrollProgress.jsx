import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #4a77ff, #00cea8)",
      }}
    />
  );
};

export default ScrollProgress;
