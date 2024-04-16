import React, { useState, useEffect } from "react";
import "./CourseComponent.css";
import EditIcon from "../../icons/editIcon.jsx";
import DeleteIcon from "../../icons/deleteIcon.jsx";
import ModalEdit from "../ModalEditComponent/ModalEditComponent";
import ModalDelete from "../ModalDeleteComponent/ModalDeleteComponent";
import ModalNew from "../ModalNewComponent/ModalNewComponent";

function CourseComponent(props) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [calificacionIdsUsuario, setCalificacionIdsUsuario] = useState([]);

  useEffect(() => {
    fetchCalificaciones();
  }, []);

  const fetchCalificaciones = async () => {
    try {
      const response = await fetch("http://localhost:4000/calificaciones");
      if (!response.ok) {
        throw new Error("Error al obtener calificaciones");
      }
      const data = await response.json();
      setCalificaciones(data);
    } catch (error) {
      console.error("Error al obtener calificaciones:", error);
    }
  };

  const handleEditButtonClick = (calificacionIds) => {
    console.log("IDs de calificaciones del usuario:", calificacionIds);
    setShowModalEdit(true);
    setCalificacionIdsUsuario(calificacionIds);
  };

  const handleDeleteButtonClick = (calificacionIds) => {
    console.log("IDs de calificaciones a eliminar:", calificacionIds);
    setShowModalDelete(true);
    setCalificacionIdsUsuario(calificacionIds);
  };

  const renderCalificaciones = () => {
    const test = Object.groupBy(
      calificaciones,
      (calificacion) => calificacion.userInfo._id
    );

    const newElements = [];
    for (const [key, value] of Object.entries(test)) {
      newElements.push({
        key,
        value,
      });
    }

    const rows = newElements.map((element) => {
      const { value } = element;
      const userInfo = value[0].userInfo; 

      const calificacionIdsUsuario = value.map((calificacion) => calificacion.calificacionId);

      const calificacionesUsuario = value.reduce((acc, curr) => {
        acc[curr.matInfo.materia] = curr.calificacion;
        return acc;
      }, {});

      return (
        <tr key={userInfo._id}>
          <td>{userInfo.name}</td>
          <td>{userInfo.email}</td>
          <td>{calificacionesUsuario['Bases de datos']}</td>
          <td>{calificacionesUsuario['Modelado 3D']}</td>
          <td>{calificacionesUsuario['Programación web']}</td>
          <td className="td-last-cr">
            <button
              className="iconButton"
              onClick={() => handleEditButtonClick(calificacionIdsUsuario)}
            >
              <EditIcon />
            </button>
            <button
              className="iconButton"
              onClick={() => handleDeleteButtonClick(calificacionIdsUsuario)}
            >
              <DeleteIcon />
            </button>
          </td>
        </tr>
      );
    });

    return rows;
  };

  return (
    <div className="container-cr">
      <div>
        <h1 className="h1-cr">Calificaciones</h1>
      </div>
      <table className="table-cr">
        <thead>
          <tr className="thead-tr-first-cr">
            <th>Nombre</th>
            <th>Correo</th>
            <th>Base de datos</th>
            <th>Modelado 3D</th>
            <th>Programación web</th>
            <th className="thead-tr-th-last">Acción</th>
          </tr>
        </thead>
        <tbody>{renderCalificaciones()}</tbody>
        <tfoot>
          <tr>
            <td colSpan="6"></td>
          </tr>
        </tfoot>
      </table>
      {showModalEdit && <ModalEdit setShowModalEdit={setShowModalEdit} calificacionIdsUsuario={calificacionIdsUsuario} />}
      {showModalDelete && (
        <ModalDelete setShowModalDelete={setShowModalDelete} calificacionIds={calificacionIdsUsuario} />
      )}
      <div className="div-button">
        <button className="button-lg" onClick={() => setShowModalNew(true)}>
          Crear nuevas calificaciones
        </button>
      </div>
      {showModalNew && <ModalNew setShowModalNew={setShowModalNew} />}
    </div>
  );
}

export default CourseComponent;