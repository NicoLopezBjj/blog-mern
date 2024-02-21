//página para ver las requests de los usuarios que quieren ser mod

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'
import '../css/clear.css';
import '../css/dark.css'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import Header from '../../components/parts/Header';
import { useParams, useNavigate } from 'react-router-dom';

function Request (){
    const {user} = useContext(User)
    const {dark} = useContext(DarkMode)
    const {userId} = useParams()
    const navigate = useNavigate()
    const [request, setRequest] = useState([])

    useEffect(()=>{
        async function getRequest(){
            const petition = await axios.get(`http://localhost:3001/role/${userId}/get-req`)
            console.log(petition)
            if(petition){
                setRequest(petition.data)
            }
        }
        getRequest()
    },[])

    const acceptRequest = async () => {
        try {
            console.log({ userId: user._id })
            const response = await axios.post(`http://localhost:3001/role/${userId}/code-generate-send-email`,{userId : user._id});
            console.log('come front acceptRequest', user)
            console.log('come front',userId)
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

    const rejectRequest = async () => {
        const del = await axios.delete(`http://localhost:3001/role/${userId}/reject-req`, {withCredentials:true})
        if(del.data == "del"){
            setTimeout(()=>{navigate("/mod/requests")}, 1000)
        }else{
            console.log(del.data)
        }
    }

    return (
        <div className="bg-5">
            <Header/>
            <div className='ms-4'>
                {request.length != [] ? 
                <>
                <section className={dark ? "post dark-bg" : "post clear-bg"}>
                    <div className="post-header">
                        <h1>Solicitud de: {request.mail}</h1>
                    </div>
                    <p className="post-body">{request.body}</p>
                    <div className="add-post-form-button">
                        <button className="add-btn signin-btn" onClick={acceptRequest}>Aceptar solicitud</button>
                        <button className="add-btn signup-btn" onClick={rejectRequest}>Rechazar solicitud</button>
                    </div>
                    {/* <div className="post-buttons"></div> */}
                </section>
                <section className={dark ? "post dark-bg" : "post clear-bg"}>
                    <h3>IMPORTANTE: </h3>
                    <p style={{fontWeight:"bold"}}>
                    Aceptar la solicitud significa darle el rol de mod/administrador a un usuario que no lo es. 
                    Antes de tomar una decisión, verifica el cuerpo de esta solicitud y los siguientes datos del usuario: PERFIL, ENTRADAS, COMENTARIOS y AMIGOS. <br /> 
                    Si aceptas la solicitud y el mod elegido termina dañando a la página o a terceros relacionados, será TU responsabilidad.</p>
                </section>
                </>
                
                : "no hay"}
            </div>
        </div>
    )
}


export default Request