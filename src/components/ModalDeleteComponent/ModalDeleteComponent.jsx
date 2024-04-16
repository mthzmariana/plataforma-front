import React, { useState } from "react";
import './ModalDeleteComponent.css'; 

export default function ModalDelete({ setShowModalDelete, calificacionIds }) { 
    const [modalDelete, setModalDelete] = useState(true); 

    const toggleModalDelete = () => {
        setModalDelete(!modalDelete);
        setShowModalDelete(false); 
    };

    const handleDelete = async () => {
        try {
            // Enviar una solicitud DELETE al servidor para eliminar las calificaciones
            await Promise.all(calificacionIds.map(async (id) => {
                const response = await fetch(`http://localhost:4000/eliminar-calificaciones/${id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("Error al eliminar la calificación");
                }
            }));
            console.log("Calificaciones eliminadas exitosamente");
            toggleModalDelete();
        } catch (error) {
            console.error("Error al eliminar calificaciones:", error);
        }
    };

    return (
        <>
            {modalDelete && (
                <div className="modal">
                    <div onClick={toggleModalDelete} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Eliminar calificaciones</h2>
                        <p className="parrafo">¿Estás seguro que quieres eliminar los registros de calificaciones del alumno?</p>
                        <div className="modal-buttons">
                            <button className="delete-button" onClick={handleDelete}>
                                Eliminar
                            </button>
                            <button className="close-button" onClick={toggleModalDelete}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
