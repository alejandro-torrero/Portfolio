import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProjectList from "./components/ProjectList";

// Projects
import SAV from "./components/sav/SAV";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/smart-asset-vinte" element={<SAV />} />
      <Route path="/projects" element={<ProjectList />} />
    </Routes>
  );
};
export default App;
