import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { StudentsPage } from "./pages/StudentsPage";
import { ProfessorsPage } from "./pages/ProfessorsPage";
import { ProjectDocumentationPage } from "./pages/ProjectDocumentationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="custom-bg-color">
        <Routes>
          {/* <Route index element={<EventsPage />} /> */}
          <Route path="/courses" element={<HomePage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path="/documentation" element={<ProjectDocumentationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
