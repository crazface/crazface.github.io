import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stamp from "./pages/Stamp";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Stamp />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
