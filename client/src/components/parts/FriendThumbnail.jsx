//miniatura para amigo en profile/friends/requests


import { useContext, useState } from 'react';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { DarkMode } from '../../context/DarkMode';

function FriendThumbnail({name, img}) {
  const {dark} = useContext(DarkMode)

  return (
    <div className="thumbnail">
        <div className="thumbnail-header">
            <h1 className={dark ? "drkmd" : "strhov"}>{name}</h1>
            <img src={img} alt="Imagen" className="friend-picture" />
        </div>
    </div>
  );
}

export default FriendThumbnail;