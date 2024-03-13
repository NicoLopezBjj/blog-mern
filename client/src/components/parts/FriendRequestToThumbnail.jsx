//página para ver las requests de los usuarios que quieren ser mod

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../css/clear.css';
import '../css/dark.css'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import Header from './Header';
import { Link, useNavigate, useParams} from 'react-router-dom';

function FriendRequestToThumbnail ({to}){
    const {user} = useContext(User)
    const {dark} = useContext(DarkMode)
    const {userId,requestId} = useParams()
    const [userInfo, setUserInfo] = useState([])
    const friendLink = `/user/${to}`

    useEffect(()=>{
        async function getTo(){
             const info = await axios.get(`http://localhost:3001/find/${to}`)
             if(info){
                 setUserInfo(info.data)
             }
        }
        getTo()
     },[])

    // const acceptRequest = async (request) =>{
    //     try{
    //         await axios.post(`http://localhost:3001/u/${userId}/add-friend/${requestId}`)
    //         //setRequests(requests.filter(request =>request._id !== requestId))
    //         alert('Solicitud aceptada con exito')
    //     }catch(e){
    //     console.log('error accepting friend request',e)}
    // }

    const cancelRequest = async (request) =>{
        try{
            await axios.post()
        }catch(e){
            console.log("Error when rejecting friend request",e)
        }
    }

    /*
    requests.length > 0 ?  
                    requests.map((request)=>{
                       return (<div key={request._id} className="request-thumbnail">
                            <p>{request.fromUser.name} quiere ser tu amigo</p>
                            <div className='request-actions'>
                                <button onClick={()=>acceptRequest(request._id)}>Aceptar</button>
                                <button onClick={()=>rejectRequest(request._id)}>Rechazar</button>
                            </div>
                       </div>)
                    })
                : 
                    <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>En este momento no hay ninguna solicitud de amistad.</h1>
                }
    */

    return (
        <div className="thumbnail">
            <div className="thumbnail-header">
                <h1 style={{marginRight:"0.3em"}}>Solicitud enviada a: <Link to={friendLink} className={dark ? "drkmd underline" : "strhov underline"}>{userInfo != [] ? userInfo.name : "...."}</Link></h1>
                <button className="header-btn signup-btn">Cancelar solicitud</button>
            </div>
        </div>
    );
}


export default FriendRequestToThumbnail