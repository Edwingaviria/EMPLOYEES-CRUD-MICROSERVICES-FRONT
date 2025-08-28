import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSearchByProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_PROJECTS = "http://localhost:9090/api/project/all";
  const API_EMPLOYEES = "http://localhost:8090/api/employee/search-by-course";
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_PROJECTS);
        setProjects(response.data);
      } catch (error) {
        console.error("Error al cargar los proyectos:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    if (!projectId) {
      setEmployees([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_EMPLOYEES}/${projectId}`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error al cargar los empleados:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Buscar Empleados por Proyecto</h3>
      <div className="mb-3">
        <label className="form-label">Selecciona un Proyecto:</label>
        <select
          className="form-select"
          value={selectedProject}
          onChange={handleProjectChange}>
          <option value="">-- Seleccionar Proyecto --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Cargando empleados...</p>
      ) : employees.length > 0 ? (
        <table className="table table-bordered  table-striped table-hover mt-4">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>ID Proyecto</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.projectId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : selectedProject && !loading ? (
        <p>No se encontraron empleados para este proyecto.</p>
      ) : null}
    </div>
  );
};

export default EmployeeSearchByProject;
