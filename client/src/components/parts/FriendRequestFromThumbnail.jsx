//página para ver las requests de los usuarios que quieren ser mod

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../css/clear.css';
import '../css/dark.css'
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';
import { Link, useParams } from 'react-router-dom';

function FriendRequestFromThumbnail ({request_id,from}){
    const {dark} = useContext(DarkMode)
    const {user} = useContext(User)
    const [userInfo, setUserInfo] = useState([])
    const friendLink = `/user/${from}`
    

    useEffect(()=>{
        console.log("entro")
       async function getFrom(){
            console.log("info antes")
            const info = await axios.get(`http://localhost:3001/find/${from}`)
            console.log("info", info)
            if(info){
                setUserInfo(info.data)
            }
       }
       getFrom()
    },[])

  
    const acceptRequest = async (request_id) =>{
        console.log(request_id)
        try{
            await axios.post(`http://localhost:3001/u/${userInfo._id}/add-friend`,  { withCredentials:true ,requestId : request_id})
            console.log(request_id)
            alert('Solicitud aceptada con exito')
        }catch(e){
            console.log(request_id)
            console.log('error accepting friend request',e)}
    }

    // const rejectRequest = async (request) =>{
    //     try{
    //         await axios.post()
    //     }catch(e){
    //         console.log("Error when rejecting friend request",e)
    //     }
    // }

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
                <h1 style={{marginRight:"0.3em"}}>Solicitud de: <Link to={friendLink} className="strhov underline">{userInfo != [] ? userInfo.name : "...."}</Link></h1>
                <div style={{display:"flex"}}>
                    <button className="header-btn signin-btn" onClick={()=> acceptRequest(request_id)}>Aceptar solicitud</button>
                    <button className="header-btn signup-btn" >Rechazar solicitud</button>
                </div>
            </div>
        </div>
    );
}


export default FriendRequestFromThumbnail