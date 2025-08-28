import ListComponent from "../hooks/ListComponent";

const Projects = () => {
  return (
    <ListComponent
      URI="http://localhost:9090/api/project/all"
      URIDELETE="http://localhost:9090/api/project/delete"
      title="Lista de Proyectos"
      fields={["name", "director"]}
      createLink="/createProject"
      deleteLink="/deleteProject"
      detailLink="/detailProject"
      editLink="/editProject"
    />
  );
};

export default Projects;
