import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './css/clear.css'
import './css/dark.css'
import { Link } from 'react-router-dom';
import { DarkMode } from '../context/DarkMode';
import { User } from '../context/User';
import Header from './parts/Header';
import PostThumbnail from './parts/PostThumbnail';

function Dashboard() {
  const {user} = useContext(User)
  const [posts, setPosts] = useState([])
  const {dark} = useContext(DarkMode)
  console.log(user)

  useEffect(()=>{
    console.log("el dashboard")
    async function postsOnDashboard(){
      const petition = await axios.get('http://localhost:3001/p/all')
        console.log(petition.data)
        if(user && petition.data){
          setPosts(petition.data)
        }
        console.log("P2", posts)
    }
    postsOnDashboard()
  },[user]) //user como dependencia. Si user es null este useEffect no se ejecuta, pero lo hace siempre que user sea una variable activa con un valor

  // useEffect(()=>{
  //   async function auth(){
  //     const response = await axios.get("http://localhost:3001/auth",{withCredentials:true})
  //     console.log(response)
  //   }
  //   auth()
  // },[])
  console.log("P", posts)
  return (
    <div className="bg-2">
        <Header/>
        <section className={dark ? "dashboard dark-dashboard" : "dashboard clear-dashboard"}>
            <div className="dashboard-header">
              <h1>Muro</h1>
              <Link to="/add"><button className="header-btn signup-btn">Agregar entrada</button></Link>
            </div>
            <div className="posts">
              {/* posts.map return (<Link to=`/p.user/p._id`><PostThumbnail c props /></Link>) */}
                {posts.length > 0 ? 
                  posts.map((p)=>{
                    const post = `/${p.user}/${p._id}`
                    return (<Link to={post}><PostThumbnail title={p.title} 
                        username={p.username} 
                        date={p.date.slice(0, 10)} 
                        body={p.body} 
                        likes={p.likes} 
                        visits={p.visits} 
                        comments={p.comments} /> 
                      </Link>)
                  }) 
                : <h1 style={{fontSize:"2rem",marginTop:"1em", marginLeft:"1.3em"}}>En este momento no hay ningún post en tu muro.</h1>}
            </div>
        </section>
    </div>
  );
}

export default Dashboard;