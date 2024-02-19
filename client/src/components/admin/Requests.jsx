//página para ver las requests de los usuarios que quieren ser mod

import { useState, useContext } from 'react';
import axios from 'axios';
import '../css/clear.css';
import '../css/dark.css'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import Header from '../../components/parts/Header';
import { Link, useNavigate } from 'react-router-dom';

function Requests (){
    const {user} = useContext(User)
    const {dark} = useContext(DarkMode)


    const acceptRequest = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/role/${user.id}/code-generate-send-email`);
            if (response.data.success) {
                alert("Solicitud aceptada correctamente. Se ha enviado un correo electrónico al usuario con el código de confirmación.");
            } else {
                alert("Error al aceptar la solicitud. Por favor, intenta de nuevo más tarde.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error. Por favor, intenta de nuevo más tarde.");
        }
    };

    // const acceptRequest = async(e)=> {
    //     try{
    //         const response = await axios.post(`http://localhost:3001/role/${userId}/code-generate-send-email`,user.email,)
    //     }
    // }


    return (
        <div className="bg-1">
            <Header/>
            <div className='ms-4'>
                <h4>{user.email}</h4>
                <h4>{user.name}</h4>
                <form onSubmit={(e) => { e.preventDefault(); acceptRequest(); }}>
                    <button className="add-btn signin-btn">Aceptar solicitud</button>
                </form>
            </div>
        </div>
    )
}


export default Requests