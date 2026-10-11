import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Certificates from "./Certificates";
import Tech from "./Tech";
import Projects from "./Projects";
import Discovery from "./Discovery";
import Activity from "./Activity";
import Contact from "./Contact";
import { NetworkCanvas } from "./canvas";
import Footer from "./Footer";

const LEGACY_HASHES = { github: "activity", leetcode: "activity" };

const Home = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    const raw = hash.replace("#", "");
    const el = document.getElementById(LEGACY_HASHES[raw] ?? raw);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, hash]);

  return (
    <div className="relative z-0 bg-primary">
      <ScrollProgress />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <div className="bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000322] to-transparent pointer-events-none" />
      </div>
      <Projects />
      <Experience />
      <Certificates />
      <About />
      <Tech />
      <Activity />
      <Discovery />
      <div className="relative z-0 min-h-[400px]">
        <Contact />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <NetworkCanvas />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
