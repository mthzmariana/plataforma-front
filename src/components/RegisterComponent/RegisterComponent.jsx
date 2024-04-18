import React, { useState } from "react";
import "./RegisterComponent.css";
import iconLarge from "../../assets/iconLarge.png";
import { useNavigate } from "react-router-dom";

function RegisterComponent(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState(0);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = () => {
    const dataToSend = {
      name: name,
      email: email,
      edad: edad,
      password: password,
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("http://localhost:4000/register", settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la solicitud");
      })
      .then((data) => {
        console.log("Respuesta: ", data);
        alert("Datos enviados exitosamente");
        navigate("/curso");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const hablarAUsuario = (message) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.lang = "es-ES";
    synth.speak(utterThis);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;

    if (name.length < 5) {
      error = true;
      hablarAUsuario("No olvides introducir correctamente tu nombre y apellido");
    }

    if (password.length < 5) {
      error = true;
      hablarAUsuario("La contraseña debe tener al menos 5 caracteres");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="container-rg">
      <div className="form-rg prueba">
        <h1>Crear cuenta nueva</h1>
        <div>
          <label>Nombre y apellido</label>
        </div>
        <div>
          <input
            className="input-box"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Katy Jones"
            required
          />
        </div>

        <div>
          <label>Correo electrónico</label>
        </div>
        <div>
          <input
            className="input-box"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <label>Edad</label>
        </div>
        <div>
          <input
            className="input-box"
            type="number"
            value={edad}
            onChange={(event) => setEdad(event.target.value)}
            placeholder="21"
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
        </div>
        <div>
          <input
            className="input-box"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>

        <div className="buttons">
          <button className="button-regis" onClick={handleSubmit}>
            Registrar
          </button>

          <button className="button-tengo" onClick={handleLoginRedirect}>
            Tengo cuenta
          </button>
        </div>
      </div>

      <div>
        <img className="img-lg" src={iconLarge} alt="Icono grande" />
      </div>
    </div>
  );
}

export default RegisterComponent;
