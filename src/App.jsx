import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";

// Projects
import SAV from "./components/sav/SAV";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/smart-asset-vinte" element={<SAV />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
};
export default App;
