import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const logoutHandler = (e) => {
    e.preventDefault()
    auth.logout()
    navigate('/')
  }
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Logo</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><NavLink to="/" onClick={logoutHandler}>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}