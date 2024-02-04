//página para post completo con comentarios, likes y visitas

import { useContext, useState } from 'react';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import Header from './parts/Header';
import { useParams } from 'react-router-dom';

function Post() {
    const [post, setPost] = useState(false)
    const {userId, postId} = useParams()
    //si el usuario es admin, tiene la opción de editar o eliminar posts.
  return (
    <div className="bg-1">
        <Header/>
        <section className="hero">
            <h1>Agregar post</h1>
            <h2>La página por la que preguntaste no existe.</h2>
            <div className="hero-btns">
                {/* <a href="/signin"><button className="hero-btn signin-btn">Iniciar sesión</button></a> */}
                <a href="/dashboard"><button className="hero-btn signup-btn">Ir al muro</button></a>
            </div>
        </section>
    </div>
  );
}

export default Post;