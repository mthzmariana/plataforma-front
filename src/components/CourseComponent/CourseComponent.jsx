import { useState } from "react";
import "./CourseComponent.css";
import EditIcon from "../../icons/editIcon.jsx";
import DeleteIcon from "../../icons/deleteIcon.jsx";
import ModalEdit from "../ModalEditComponent/ModalEditComponent";

function CourseComponent(props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container-rp">
        <div>
            <h1 className="h1-rp">Calificaciones</h1>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Materia 1</th>
                    <th>Materia 2</th>
                    <th>Materia 3</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Katy Jones</td>
                    <td>KatyJ@email.com</td>
                    <td>Diseño gráfico</td>
                    <td>Programación de Videojuegos</td>
                    <td>Bases de datos</td>
                    <td>
                        <button className="iconButton"
                        onClick={()=>{setOpenModal(true);}}>
                            <EditIcon/>
                        </button>
                        <button className="iconButton">
                            <DeleteIcon/>
                        </button>
                        {openModal && <ModalEdit closeModal={setOpenModal}/>}
                    </td>
                </tr>
                <tr>
                    <td>Renee Jane</td>
                    <td>ReneeJ@email.com</td>
                    <td>Diseño gráfico</td>
                    <td>Programación de Videojuegos</td>
                    <td>Bases de datos</td>
                    <td>
                        <button className="iconButton">
                            <EditIcon/>
                        </button>
                        <button className="iconButton">
                            <DeleteIcon/>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>Carla Morrison</td>
                    <td>CarlaM@email.com</td>
                    <td>Diseño gráfico</td>
                    <td>Programación de Videojuegos</td>
                    <td>Bases de datos</td>
                    <td>
                        <button className="iconButton">
                            <EditIcon/>
                        </button>
                        <button className="iconButton">
                            <DeleteIcon/>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>Jenie Kim</td>
                    <td>JennieK@email.com</td>
                    <td>Diseño gráfico</td>
                    <td>Programación de Videojuegos</td>
                    <td>Bases de datos</td>
                    <td>
                        <button className="iconButton">
                            <EditIcon/>
                        </button>
                        <button className="iconButton">
                            <DeleteIcon/>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>Lalisa Manoban</td>
                    <td>LalisaM@email.com</td>
                    <td>Diseño gráfico</td>
                    <td>Programación de Videojuegos</td>
                    <td>Bases de datos</td>
                    <td>
                        <button className="iconButton">
                            <EditIcon/>
                        </button>
                        <button className="iconButton">
                            <DeleteIcon/>
                        </button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="6">Total de reprobados: no sé</td>
                </tr>
            </tfoot>
        </table>
    </div>
  );
  
}

export default CourseComponent;
