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

function Requests (){
    const {user} = useContext(User)
    const {dark} = useContext(DarkMode)
    const {userId} = useParams()
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        async function getRequests(){
            const petition = await axios.get("http://localhost:3001/role/get-reqs")
            if(petition){
                setRequests(petition.data)
            }
        }
        getRequests()
    },[])

    // const acceptRequest = async(e)=> {
    //     try{
    //         const response = await axios.post(`http://localhost:3001/role/${userId}/code-generate-send-email`,user.email,)
    //     }
    // }

    /*
        requests.map((r)=>{
            const requestLink = `/mod/request/${r.userId}`
            return <Link to={requestLink}><RequestThumbnail mail={r.mail} /></Link>
        })
    */


    return (
        <div className="bg-5">
        <Header/>
        <section className={dark ? "userboard dark-dashboard" : "userboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Lista de usuarios</h1>
              <Link to="/mod/users"><button className="header-btn signup-btn">Administrar</button></Link>
            </div>
        </section>
        <section className={dark ? "dashboard dark-dashboard" : "dashboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Solicitudes</h1>
            </div>
            <div className="posts">
                {requests.length > 0 ?  
                    requests.map((r)=>{
                        const requestLink = `/mod/request/${r.userId}`
                        return <Link to={requestLink}><RequestThumbnail mail={r.mail} /></Link>
                    })
                : 
                    <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>En este momento no hay ninguna solicitud.</h1>
                }
            </div>
        </section>
    </div>
    )
}


export default Requests