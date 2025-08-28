import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ListComponent = ({
  URI,
  URIDELETE,
  title,
  fields,
  createLink,
  detailLink,
  editLink,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        fields.some((field) =>
          item[field]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, items]);

  const getItems = async () => {
    try {
      const res = await axios.get(URI);
      setItems(res.data);
      setFilteredItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      navigate("/notFound");
    }
  };

  const deleteItem = async (id) => {
    swal({
      title: "Eliminar Registro",
      text: "¿Está seguro de eliminar el registro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`${URIDELETE}/${id}`);
          swal("El registro se borró satisfactoriamente", {
            icon: "success",
          }).then(() => {
            getItems();
          });
        } catch (error) {
          console.error("Error deleting item:", error);
          swal("Ocurrió un error al intentar borrar el registro.", {
            icon: "error",
          });
        }
      } else {
        swal("El registro no se borró", { icon: "error" });
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">{title}</h3>

                {/* Campo de búsqueda */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Buscar`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end mb-3">
                  <Link to={createLink} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Crear
                  </Link>
                </div>

                {/* Tabla de items */}
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary text-center">
                    <tr>
                      {fields.map((field, index) => (
                        <th key={index}>{field}</th>
                      ))}
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        {fields.map((field, index) => (
                          <td key={index}>{item[field]}</td>
                        ))}
                        <td className="text-center">
                          <Link
                            to={`${detailLink}/${item.id}`}
                            className="btn btn-info btn-sm me-2">
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            to={`${editLink}/${item.id}`}
                            className="btn btn-warning btn-sm me-2">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="btn btn-danger btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
