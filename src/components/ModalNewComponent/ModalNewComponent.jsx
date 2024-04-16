import React, { useState, useEffect } from "react";
import './ModalNewComponent.css'; 

export default function ModalNew({ setShowModalNew }) { 
    const [modalNew, setModalNew] = useState(true); 
    const [selectedUser, setSelectedUser] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [calificacionBaseDatos, setCalificacionBaseDatos] = useState("");
    const [calificacionModelado, setCalificacionModelado] = useState("");
    const [calificacionProgramacion, setCalificacionProgramacion] = useState("");

    // Función para cargar la lista de usuarios sin calificaciones
    const fetchUsuariosSinCalificaciones = async () => {
        try {
            const response = await fetch("http://localhost:4000/sin-calificaciones");
            if (!response.ok) {
                throw new Error("Error al obtener usuarios sin calificaciones");
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para cargar la lista de materias
    const fetchMaterias = async () => {
        try {
            const response = await fetch("http://localhost:4000/materias");
            if (!response.ok) {
                throw new Error("Error al obtener materias");
            }
            const data = await response.json();
            setMaterias(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsuariosSinCalificaciones();
        fetchMaterias();
    }, []);

    const toggleModalNew = () => {
        setModalNew(!modalNew);
        setShowModalNew(false); 
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleGuardar = async () => {
        try {
            const userId = selectedUser;
            const materiaIdBaseDatos = materias[0]._id; // Suponiendo que las materias están en el mismo orden que los inputs
            const materiaIdModelado = materias[1]._id;
            const materiaIdProgramacion = materias[2]._id;

            await enviarCalificacion(userId, materiaIdBaseDatos, calificacionBaseDatos);
            await enviarCalificacion(userId, materiaIdModelado, calificacionModelado);
            await enviarCalificacion(userId, materiaIdProgramacion, calificacionProgramacion);

            console.log("Calificaciones enviadas correctamente");
        } catch (error) {
            console.error("Error al enviar calificaciones:", error);
        }
    };

    const enviarCalificacion = async (userId, materiaId, calificacion) => {
        try {
            const response = await fetch("http://localhost:4000/crear-calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, materiaId, calificacion }),
            });
            if (!response.ok) {
                throw new Error("Error al enviar calificación");
            }
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            throw error;
        }
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

                        <div className="materia-dropdown">
                            <select
                                id="usuario"
                                value={selectedUser}
                                onChange={handleUserChange}
                            >
                                <option value="">Seleccionar Usuario</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario._id} value={usuario._id}>
                                        {usuario.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Base de datos</label>
                        </div>

                        <div>
                            <input
                                className="input-box" 
                                type="number" 
                                name="inputCalf1"
                                id="inputCalf1"
                                value={calificacionBaseDatos}
                                onChange={(event) => setCalificacionBaseDatos(event.target.value)}
                            />
                        </div>

                        <div>
                            <label>Modelado 3D</label>
                        </div>
                        <div>
                            <input
                                className="input-box"
                                type="number" 
                                name="inputCalf2"
                                id="inputCalf2"
                                value={calificacionModelado}
                                onChange={(event) => setCalificacionModelado(event.target.value)}
                            />
                        </div>
                
                        <div>
                            <label>Programación web</label>
                        </div>
                        <div>
                            <input
                                className="input-box" 
                                type="number" 
                                name="inputCalf3"
                                id="inputCalf3" 
                                value={calificacionProgramacion}
                                onChange={(event) => setCalificacionProgramacion(event.target.value)}
                            />
                        </div>
                        <div className="modal-buttons">
                            <button className="save-button" onClick={handleGuardar}>
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
