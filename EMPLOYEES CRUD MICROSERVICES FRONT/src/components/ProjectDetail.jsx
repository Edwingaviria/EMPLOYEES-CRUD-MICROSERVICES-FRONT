import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:9090/api/project/search";

const DetailProject = () => {
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

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
                  Detalle del Proyecto
                </h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      value={name}
                      readOnly
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Director</label>
                    <input
                      value={director}
                      readOnly
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}>
                      Regresar
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

export default DetailProject;
