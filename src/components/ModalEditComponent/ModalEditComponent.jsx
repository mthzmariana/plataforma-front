import React, { useState } from "react";
import "./ModalEditComponent.css";

export default function ModalEdit({ setShowModalEdit, calificacionIdsUsuario }) {
  const [modalEdit, setModalEdit] = useState(true);
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedCalificacionId, setSelectedCalificacionId] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const materias = ["Bases de datos", "Modelado 3D", "Programación web"];

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
    setShowModalEdit(false);
  };

  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
    const index = materias.indexOf(event.target.value);
    setSelectedCalificacionId(calificacionIdsUsuario[index]);
    console.log("Id de calificación:", index);
  };

  const handleGuardarClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/editar-calificaciones/${selectedCalificacionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          calificacion
        })
      });
      if (!response.ok) {
        throw new Error("Error al actualizar la calificación");
      }
      const data = await response.json();
      console.log(data.message);
      toggleModalEdit();
    } catch (error) {
      console.error("Error al actualizar la calificación:", error);
    }
  };

  return (
    <>
      {modalEdit && (
        <div className="modal">
          <div onClick={toggleModalEdit} className="overlay"></div>

          <div className="modal-content">
            <h2>Editar calificaciones</h2>

            <div>
              <label>Materia</label>
            </div>

            <div className="materia-dropdown">
              <select
                id="materia"
                value={selectedMateria}
                onChange={handleMateriaChange}
              >
                {materias.map((materia) => (
                  <option key={materia} value={materia}>
                    {materia}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Calificación</label>
            </div>
            <div>
              <input
                className="input-box"
                type="number"
                name="inputCalf"
                id="inputCalf"
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button className="save-button" onClick={handleGuardarClick}>
                Guardar
              </button>
              <button className="close-button" onClick={toggleModalEdit}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
