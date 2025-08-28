import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:8090/api/employee/search";

const URIUPDATE = "http://localhost:8090/api/employee/update";

const UpdateEmployee = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    try {
      const updateEmployee = await axios({
        method: "PUT",
        url: `${URIUPDATE}/${id}`,
        data: {
          id: id,
          name: name,
          lastName: lastName,
          email: email,
          projectId: parseInt(projectId),
        },
      });

      if (updateEmployee.status === 200) {
        swal("El registro se modificó satisfactoriamente", {
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else {
        swal(
          "Error",
          updateEmployee.data.errors[0].type +
            " " +
            updateEmployee.data.errors[0].message,
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
                  Actualizar Empleado
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
                    <label className="form-label">Apellido</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ID del Proyecto</label>
                    <input
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      type="number"
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

export default UpdateEmployee;
