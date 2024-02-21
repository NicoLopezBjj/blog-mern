//página para miniaturas de solicitudes en Requests.jsx

import { useContext, useState } from 'react';
import '../../../App.css';
import '../../css/clear.css'
import '../../css/dark.css'
import { Link } from 'react-router-dom';
import { User } from '../../../context/User';

function RequestThumbnail({id, mail}) {

  return (
    <div className="thumbnail">
        <div className="thumbnail-header">
          <div style={{display:"flex"}}>
            <h1 style={{marginRight:"0.3em"}}>Solicitud de:</h1>
            <h1>{mail}</h1>
          </div>
          <h1>Mod</h1>
        </div>
    </div>
  );
}

export default RequestThumbnail;