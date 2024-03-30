import React, { useState } from "react";
import './ModalDeleteComponent.css'; 

export default function ModalDelete({ setShowModalDelete }){ 
    const [modalDelete, setModalDelete] = useState(true); 

    const toggleModalDelete = () => {
        setModalDelete(!modalDelete);
        setShowModalDelete(false); 
    };

    return (
        <>
            {modalDelete && (

                <div className="modal">
                           
                    <div onClick={toggleModalDelete} className="overlay"></div>

                    <div className="modal-content">

                        <h2>
                        Eliminar calificaciones
                        </h2>

                        <p className="parrafo">¿Estás seguro que quieres eliminar los registros de calificaciones?</p>

                        <div className="modal-buttons">
                            <button className="delete-button" >
                            Borrar
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
