import { useEffect } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import NavBar from "./shared/Navbar";

import Employees from "./components/Employees";
import EmployeeDetail from "./components/EmployeeDetail";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

import Projects from "./components/Projects";
import CreateProject from "./components/CreateProject";
import UpdateProject from "./components/UpdateProject";
import EmployeeSearchByProject from "./components/EmployeeSearchByProject ";
import DetailProject from "./components/ProjectDetail";

function App() {
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.hash
      );
    }
  }, []);

  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/detailEmployee/:id" element={<EmployeeDetail />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/editEmployee/:id" element={<UpdateEmployee />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/detailProject/:id" element={<DetailProject />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/editProject/:id" element={<UpdateProject />} />

          <Route
            path="/employeeSearchByProject"
            element={<EmployeeSearchByProject />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
