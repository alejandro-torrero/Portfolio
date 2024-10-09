import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Projects from "./Projects";
import Contact from "./Contact";
import Feedbacks from "./Feedbacks";
import { StarsCanvas } from "./canvas";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center bg">
        <Navbar />
        <Hero />
        <div className="bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000322] to-transparent"></div>
      </div>
      <About />
      <Experience />
      <Tech />
      <Projects />
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <Contact />
        {/* <StarsCanvas /> */}
      </div>
      <Footer />
    </div>
  );
};
export default Home;
