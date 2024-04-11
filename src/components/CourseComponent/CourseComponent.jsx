import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        fetchCalificaciones();
    }, []);

    const fetchCalificaciones = async () => {
        try {
            const response = await fetch('http://localhost:4000/calificaciones');
            if (!response.ok) {
                throw new Error('Error al obtener calificaciones');
            }
            const data = await response.json();
            setCalificaciones(data);
        } catch (error) {
            console.error('Error al obtener calificaciones:', error);
        }
    };

    const renderCalificaciones = () => {
        const usersMap = new Map();

        // Agrupar calificaciones por usuario
        calificaciones.forEach(calificacion => {
            const { userInfo, calificacion: calif, matInfo } = calificacion;
            const { name, email } = userInfo;
            const materia = matInfo.materia;

            if (!usersMap.has(name)) {
                usersMap.set(name, { email, calificaciones: {} });
            }

            const user = usersMap.get(name);
            user.calificaciones[materia] = calif;
        });

        // Renderizar filas para cada usuario
        const rows = [];
        usersMap.forEach((userInfo, name) => {
            const { email, calificaciones } = userInfo;
            rows.push(
                <tr key={name}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{calificaciones['Bases de datos'] || '-'}</td>
                    <td>{calificaciones['Modelado 3D'] || '-'}</td>
                    <td>{calificaciones['Programación web'] || '-'}</td>
                    <td className='td-last-cr'>
                        <button className="iconButton" onClick={() => setShowModalEdit(true)}>
                            <EditIcon />
                        </button>
                        <button className="iconButton" onClick={() => setShowModalDelete(true)}>
                            <DeleteIcon />
                        </button>
                    </td>
                </tr>
            );
        });

        return rows;
    };

    return (
        <div className='container-cr'>
            <div>
                <h1 className='h1-cr'>Calificaciones</h1>
            </div>
            <table className='table-cr'>
                <thead>
                    <tr className='thead-tr-first-cr'>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Base de datos</th>
                        <th>Modelado 3D</th>
                        <th>Programación web</th>
                        <th className='thead-tr-th-last'>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCalificaciones()}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6"></td>
                    </tr>
                </tfoot>
            </table>
            {showModalEdit && <ModalEdit setShowModalEdit={setShowModalEdit} />} {/* Renderiza el modal solo si showModalEdit es true */}
            {showModalDelete && <ModalDelete setShowModalDelete={setShowModalDelete} />}

            <div className='div-button'>
                <button className='button-lg' onClick={() => setShowModalNew(true)}>Crear nuevas calificaciones</button>
            </div>
            {showModalNew && <ModalNew setShowModalNew={setShowModalNew} />}
        </div>
    );
}

export default CourseComponent;
