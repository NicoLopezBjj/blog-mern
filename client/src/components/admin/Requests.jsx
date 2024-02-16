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


    const acceptRequest = async(e)=> {

    }


    return (
        <div className="bg-1">
            <Header/>
            <div className='ms-4'>
                <h4>{user.email}</h4>
                <h4>{user.name}</h4>
                <form onSubmit={acceptRequest}>
                    <button className="add-btn signin-btn">Aceptar solicitud</button>
                </form>
            </div>
        </div>
    )
}


export default Requests