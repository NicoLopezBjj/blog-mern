//página para miniaturas de post en perfiles

import { useContext, useState } from 'react';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { Link } from 'react-router-dom';
import { User } from '../../context/User';

function PostThumbnail_onProfile({title, username, date, body, likes, visits, comments}) {

  return (
    <div className="thumbnail">
        <div className="thumbnail-header">
          <h1>{title}</h1>
          <h1>{username} | {date}</h1>
        </div>
        <h3 className="thumbnail-body">{body}</h3>
        <div className="thumbnail-footer">
          <h3>{likes} likes</h3>
          <h3>{visits} visits</h3>
          <h3>{comments.length} {comments.length === 1 ? "comment" : "comments"} </h3>
        </div>
    </div>
  );
}

export default PostThumbnail_onProfile;