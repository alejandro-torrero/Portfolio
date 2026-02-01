import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Projects from "./Projects";
import Contact from "./Contact";
import { StarsCanvas } from "./canvas";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <ScrollProgress />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <div className="bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000322] to-transparent pointer-events-none" />
      </div>
      <About />
      <Experience />
      <Tech />
      <Projects />
      <div className="relative z-0 min-h-[400px]">
        <Contact />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <StarsCanvas />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
