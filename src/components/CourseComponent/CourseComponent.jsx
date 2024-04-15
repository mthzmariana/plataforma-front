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
  const [actualID, setActualID] = useState("");

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

  const renderCalificaciones = () => {

    //Agrupando datos
    const test = Object.groupBy(
      calificaciones,
      (calificacion) => calificacion.userInfo._id
    );

    //Creación de arreglo
    const newElements = [];
    for (const [key, value] of Object.entries(test)) {
      newElements.push({
        key,
        value,
      });
    }

    //Generando filas para mi tabla
    const rows = newElements.map((element) => {
      //Desestructuración de elemento y recupera usuario
      const { value } = element;
      const userInfo = value[0].userInfo; 
      
      //Creación de objeto donde las claves son las materias y los valores son las calificaciones
      const calificacionesUsuario = value.reduce((acc, curr) => {
        //Extrayendo materia y la usa como clave = La clave se establece en la propiedad de calificaccion
        acc[curr.matInfo.materia] = curr.calificacion;
        return acc;
      }, {});

      //Construyendo filas
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
              onClick={() => {
                setShowModalEdit(true);
                console.log(element.key);
              }}
            >
              <EditIcon />
            </button>
            <button
              className="iconButton"
              onClick={() => setShowModalDelete(true)}
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
      {showModalEdit && <ModalEdit setShowModalEdit={setShowModalEdit} />}{" "}
      {showModalDelete && (
        <ModalDelete setShowModalDelete={setShowModalDelete} />
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