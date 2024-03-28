import React from 'react';
import './ModalEditComponent.css'; 

function ModalEdit({ closeModal }) {

    return (

      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                closeModal(false);}}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>¿Estás seguro que deseas continuar?</h1>
          </div>
          <div className="body">
            <p>Estás por editar</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                closeModal(false);}}
              id="cancelBtn"
            >
              Cancelar
            </button>
            <button>Continuar</button>
          </div>
        </div>
      </div>

    );
}

export default ModalEdit;
