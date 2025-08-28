import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:9090/api/project/create";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");

  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    try {
      const insertProject = await axios({
        method: "POST",
        url: URI,
        data: {
          name,
          director,
        },
      });

      if (insertProject.status === 201) {
        swal("El registro se agregó satisfactoriamente", {
          icon: "success",
        }).then((value) => {
          navigate("/projects");
        });
      } else {
        swal(
          "Error",
          insertProject.data.errors[0].type +
            " " +
            insertProject.data.errors[0].message,
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
                <h3 className="card-title text-center mb-4">Crear Proyecto</h3>
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

export default CreateProject;
