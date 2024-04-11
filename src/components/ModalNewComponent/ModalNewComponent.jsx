import React, { useState } from "react";
import './ModalNewComponent.css'; 

export default function ModalNew({ setShowModalNew }){ 
    const [modalNew, setModalNew] = useState(true); 

    const toggleModalNew = () => {
        setModalNew(!modalNew);
        setShowModalNew(false); 
    };

    return (
        <>
            {modalNew && (
                <div className="modal-new">
                    <div onClick={toggleModalNew} className="overlay"></div>
                    
                    <div className="modal-content-n">

                        <div>
                            <label>Usuario</label>
                        </div>

                        <div>
                            <input className="input-box" 
                            type="string" 
                            name="inputUser"
                            id="inputUser"
                            onChange={(event)=>{
                            getName(event.target.value);
                            }}
                            />
                        </div>

                        <div>
                            <label>Email</label>
                        </div>

                        <div>
                            <input className="input-box" 
                            type="string" 
                            name="inputEmail"
                            id="inputEmail"
                            onChange={(event)=>{
                            getName(event.target.value);
                            }}
                            />
                        </div>

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
                          <button className="close-button" onClick={toggleModalNew}>
                              Cerrar
                          </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    );
}
