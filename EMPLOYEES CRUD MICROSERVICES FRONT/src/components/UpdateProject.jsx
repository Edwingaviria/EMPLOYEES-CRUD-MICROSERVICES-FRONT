import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:9090/api/project/search";

const URIUPDATE = "http://localhost:9090/api/project/update";

const UpdateProject = () => {
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    try {
      const updateProject = await axios({
        method: "PUT",
        url: `${URIUPDATE}/${id}`,
        data: {
          id: id,
          name: name,
          director: director,
        },
      });

      if (updateProject.status === 200) {
        swal("El registro se modificó satisfactoriamente", {
          icon: "success",
        }).then(() => {
          navigate("/projects");
        });
      } else {
        swal(
          "Error",
          updateProject.data.errors[0].type +
            " " +
            updateProject.data.errors[0].message,
          "error"
        );
      }
    } catch (error) {
      swal(
        "Error",
        JSON.parse(error.request.response).errors[0].message,
        "error"
      );
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${URI}/${id}`,
      });

      setName(res.data.name);
      setDirector(res.data.director);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  Actualizar Proyecto
                </h3>
                <form onSubmit={Save}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Director</label>
                    <input
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary me-2">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
