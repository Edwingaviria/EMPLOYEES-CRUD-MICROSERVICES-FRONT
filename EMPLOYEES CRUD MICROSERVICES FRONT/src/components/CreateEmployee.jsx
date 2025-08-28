import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const URI = "http://localhost:8090/api/employee/create";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();

  const Save = async (event) => {
    event.preventDefault();
    try {
      const insertEmployee = await axios({
        method: "POST",
        url: URI,
        data: {
          name,
          lastName,
          email,
          projectId: parseInt(projectId),
        },
      });

      if (insertEmployee.status === 201) {
        swal("El registro se agregó satisfactoriamente", {
          icon: "success",
        }).then((value) => {
          navigate("/");
        });
      } else {
        swal(
          "Error",
          insertEmployee.data.errors[0].type +
            " " +
            insertEmployee.data.errors[0].message,
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
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Crear Empleado</h3>
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

export default CreateEmployee;
