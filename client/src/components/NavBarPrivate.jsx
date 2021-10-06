import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import '../styles/navbarPrivate.css'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faBars
} from '@fortawesome/free-solid-svg-icons'

export default function NavBarPrivate() {
  const { userToken, logOutUser } = useContext(AuthContext);
  return (

      <nav className = "navbar fixed-top navbar-light bg-light" >
        <Link to="/">
          <img className="logo" src="/images/megaphone.png" alt="" />
        </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} className="hambIcon" />
          </button>


          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
            
              <li className="nav-item active">
        <Link className="nav-link "  to="/orgs">
          <a className="anchors">Organizations</a>
        </Link>
             </li>
                   <li className="nav-item">
        <Link className="nav-link" to={`/my-orgs`}>
          <a className="anchors">My Organizations</a>
        </Link>
         </li>
           <li className="nav-item">
        <Link className="nav-link" to="/orgs/create">
          <a className="anchors">Create an organization</a>
        </Link>
         </li>
         <li className="nav-item">
        <Link className="nav-link" to="/profile">
          <a className="anchors">Profile</a>
        </Link>
           </li>
        <li className="nav-item">
        <a className="nav-link" id="lastLink" onClick={logOutUser}>Logout, {userToken.name}</a>
                      </li>
            </ul>
          </div>
      </nav>

  );
}