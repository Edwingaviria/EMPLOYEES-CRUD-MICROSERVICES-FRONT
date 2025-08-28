import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:8090/api/employee/search";

const DetailEmployee = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");

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
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setProjectId(res.data.projectId);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  Detalle Empleado
                </h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                    readOnly
                      value={name}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      value={lastName}
                      readOnly
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      value={email}
                      readOnly
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ID del Proyecto</label>
                    <input
                      value={projectId}
                      readOnly
                      type="number"
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

export default DetailEmployee;
