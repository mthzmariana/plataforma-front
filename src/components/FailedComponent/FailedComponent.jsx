import React, { useState, useEffect } from 'react';
import "./FailedComponent.css";

function FailedComponent(props) {
    const [calificaciones, setCalificaciones] = useState([]);

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
                    <td className={calificaciones['Bases de datos'] < 6 ? 'failed' : ''}>{calificaciones['Bases de datos'] || '-'}</td>
                    <td className={calificaciones['Modelado 3D'] < 6 ? 'failed' : ''}>{calificaciones['Modelado 3D'] || '-'}</td>
                    <td className={`td-last-rp ${calificaciones['Programación web'] < 6 ? 'failed' : ''}`}>{calificaciones['Programación web'] || '-'}</td>
                </tr>
            );
        });

        return rows;
    };

    return (
        <div className='container-rp'>
            <div>
                <h1 className='h1-rp'>Alumnos con materias reprobadas</h1>
            </div>
            <table className='table-rp'>
                <thead>
                    <tr className='thead-tr-first-rp'>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Base de datos</th>
                        <th>Modelado 3D</th>
                        <th>Programación web</th>
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

        </div>
    );
}

export default FailedComponent;
