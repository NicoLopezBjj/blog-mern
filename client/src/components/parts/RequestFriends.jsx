//página para ver las requests de los usuarios que quieren ser mod

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../css/clear.css';
import '../css/dark.css'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import Header from '../../components/parts/Header';
import RequestThumbnail from './admin-parts/RequestThumbnail';
import { Link, useNavigate, useParams} from 'react-router-dom';

function RequestFriends (){
    const {user} = useContext(User)
    const {dark} = useContext(DarkMode)
    const {userId,requestId} = useParams()
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        async function getRequestsFriends(){
            const petition = await axios.get(`http://localhost:3001/u/${userId}/get-requests-friend`)
            if(petition){
                setRequests(petition.data)
            }
        }
        getRequestsFriends()
    },[])

    const acceptRequest = async (request) =>{
        try{
            await axios.post(`http://localhost:3001/u/${userId}/add-friend/${requestId}`)
            setRequests(requests.filter(request =>request._id !== requestId))
            alert('Solicitud aceptada con exito')
        }catch(e){
        console.log('error accepting friend request',e)}
    }

    const rejectRequest = async (request) =>{
        try{
            await axios.post()
        }catch(e){
            console.log("Error when rejecting friend request",e)
        }
    }

    return (
        <div className="bg-5">
        <Header/>
        <section className={dark ? "font userboard dark-dashboard" : "font userboard clear-dashboard"}>
        </section>
        <section className={dark ? "font dashboard dark-dashboard" : "font dashboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Solicitudes de amistad</h1>
            </div>
            <div className="posts">
                {requests.length > 0 ?  
                    requests.map((request)=>{
                       <div key={request._id} className="request-thumbnail">
                            <p>{request.fromUser.name} quiere ser tu amigo</p>
                            <div className='request-actions'>
                                <button onClick={()=>acceptRequest(request._id)}>Aceptar</button>
                                <button onClick={()=>rejectRequest(request._id)}>Rechazar</button>
                            </div>
                       </div>
                    })
                : 
                    <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>En este momento no hay ninguna solicitud de amistad.</h1>
                }
            </div>
        </section>
    </div>
    )
}


export default RequestFriends