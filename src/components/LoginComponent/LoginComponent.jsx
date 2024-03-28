import React, { useState } from 'react';
import "./LoginComponent.css";
import iconSmall from "../../assets/iconSmall.png";

function LoginComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const userData = { email, password };
        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };

        fetch("http://localhost:4000/login", settings)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error en la solicitud");
            })
            .then((data) => {
                console.log("Respuesta del servidor:", data);
                alert("Inicio de sesión exitoso"); 
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Datos incorrectos"); 
            });
    };

    return (
        <div className="container-sm">
            <div className="form-sm">
                <div className="img-sm">
                    <img src={iconSmall} alt="Icono pequeño" />
                </div>
                <h1 className="h1-sm">Iniciar sesión</h1>
                <div>
                    <label>Correo electrónico</label>
                    <input
                        className="input-box"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        className="input-box"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                    />
                </div>
                <div className="buttons">
                    <button className='primary-button' onClick={handleLogin}>Iniciar sesión</button>
                    <button className='second-button'>Crear cuenta</button>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
