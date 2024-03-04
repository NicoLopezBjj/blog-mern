//miniatura para amigo en profile/friends/requests


import { useContext, useState } from 'react';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { User } from '../../context/User';

function FriendThumbnail({name, img}) {
  const {user} = useContext(User)

  return (
    <div className="thumbnail">
        <div className="thumbnail-header">
            <h1 className="strhov">Amigo</h1>
            <img src={img} alt="Imagen" />
        </div>
    </div>
  );
}

export default FriendThumbnail;