//página para miniaturas de post en dashboard

import { useContext, useState } from 'react';
import '../../App.css';
import '../css/clear.css'
import '../css/dark.css'
import { Link } from 'react-router-dom';
import { User } from '../../context/User';
import { DarkMode } from '../../context/DarkMode';

function PostThumbnail({user_id, title, username, date, body, likes, visits, comments}) {
  const {dark} = useContext(DarkMode)
  const {user} = useContext(User)
  const userLink = `/user/${user_id}`

  return (
    <div className={dark ? "thumbnail dark-thumbnail" : "thumbnail clear-thumbnail"}>
        <div className="thumbnail-header">
          <h1>{title}</h1>
          <h1><Link to={username === user.name ? "/profile" : userLink} className={dark ? "drkmd underline" : "strhov underline"}>{username}</Link> | {date}</h1>
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

export default PostThumbnail;