import React, { useState } from "react";
import './ModalEditComponent.css'; 

export default function ModalEdit({ setShowModalEdit }){ 
    const [modalEdit, setModalEdit] = useState(true); 

    const toggleModalEdit = () => {
        setModalEdit(!modalEdit);
        setShowModalEdit(false); 
    };

    return (
        <>
            {modalEdit && (
                <div className="modal">
                    <div onClick={toggleModalEdit} className="overlay"></div>
                    
                    <div className="modal-content">

                        <h2>
                          Editar calificaciones
                        </h2>

                        <div>
                            <label>Base de datos</label>
                        </div>

                        <div>
                            <input className="input-box" 
                            type="number" 
                            name="inputCalf1"
                            id="inputCalf1"
                            onChange={(event)=>{
                            getName(event.target.value);
                            }}
                            />
                        </div>

                        <div>
                            <label>Modelado 3D</label>
                        </div>
                        <div>
                            <input className="input-box"
                            type="number" 
                            name="inputCalf2"
                            id="inputCalf2"
                            onChange={(event)=>{
                            getEmail(event.target.value);
                            }}
                            />
                        </div>
                
                        <div>
                            <label>Programación web</label>
                        </div>
                        <div>
                            <input className="input-box" 
                            type="number" 
                            name="inputCalf3"
                            id="inputCalf3" 
                            onChange={(event)=>{
                            getPassword(event.target.value);
                            }}
                            />
                        </div>
                        <div className="modal-buttons">
                          <button className="save-button" >
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
