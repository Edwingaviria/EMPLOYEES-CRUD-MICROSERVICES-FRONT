import ListComponent from "../hooks/ListComponent";

const Employees = () => {
  return (
    <ListComponent
      URI="http://localhost:8090/api/employee/all"
      URIDELETE="http://localhost:8090/api/employee/delete"
      title="Lista de Empleados"
      fields={["name", "lastName", "email", "projectId"]}
      createLink="/createEmployee"
      deleteLink="/deleteEmployee"
      detailLink="/detailEmployee"
      editLink="/editEmployee"
    />
  );
};

export default Employees;
