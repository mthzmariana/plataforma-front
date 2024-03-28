import React, { useState } from 'react';
import "./RegisterComponent.css";
import iconLarge from "../../assets/iconLarge.png";

function RegisterComponent(props){

    const [name, getName] = useState("");
    const [email, getEmail] = useState("");
    const [age, getAge] = useState(0);
    const [password, getPassword] = useState("");
    const getData = () => {

        const objectToBack ={
            name: name,
            email: email,
            age: age,
            password: password
        };

        const settings ={
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(objectToBack),
        };

        fetch("http://localhost:4000/insert-users", settings)
        .then((response)=>{
            if(response.ok){
            return response.json();
            }
            throw new Error("Error en la solicitud");
        })
        .then((data)=>{
            console.log("Respuesta: ", data);
            alert("Datos enviados exitosamente");
        })
        .catch((error)=>{
            console.error("Error: ", error);
        })

    };

    return(
        <div className="container-rg">

            <div className="form-rg prueba">
                <h1>
                    Crear cuenta nueva
                </h1>
                <div>
                    <label>Nombre y apellido</label>
                </div>
                <div>
                    <input className="input-box" 
                    type="text" 
                    name="inputName"
                    id="inputName"
                    placeholder="Katy Jones"
                    onChange={(event)=>{
                    getName(event.target.value);
                    }}
                    />
                </div>

                <div>
                    <label>Correo electrónico</label>
                </div>
                <div>
                    <input className="input-box"
                    type="email" 
                    name="inputEmail"
                    id="inputEmail"
                    placeholder="example@email.com"
                    onChange={(event)=>{
                    getEmail(event.target.value);
                    }}
                    />
                </div>
    
                <div>
                    <label>Edad</label>
                </div>
                <div>
                    <input className="input-box"
                    type="number" 
                    name="inputAge"
                    id="inputAge" 
                    placeholder="21"
                    onChange={(event)=>{
                    getAge(event.target.value);
                    }}
                    />
                </div>
            
                <div>
                    <label>Contraseña</label>
                </div>
                <div>
                    <input className="input-box" 
                    type="password" 
                    name="inputPassword"
                    id="inputPassword" 
                    placeholder="Introduce tu contraseña"
                    onChange={(event)=>{
                    getPassword(event.target.value);
                    }}
                    />
                </div>

                <div className="buttons">
                    <button className='primary-button' onClick={()=> getData()}>Registrar</button>

                    <button className='second-button'>Tengo cuenta</button>
                </div>

            </div>
            
            <div>
                <img className="img-lg" src={iconLarge} alt="Icono grande"/>
            </div>
        </div>
    );
}

export default RegisterComponent;