import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotographyHome from "./pages/PhotographyHome";
import StampBackup from "./pages/StampBackup";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<PhotographyHome />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/v1-backup" element={<StampBackup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
