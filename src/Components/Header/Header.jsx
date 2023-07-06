import React from 'react'
import logo from "../../logo.png"
import avatar from "../../Netflix-avatar.png"
import bell from "../../bell.png"
import { Link } from 'react-router-dom'
import {ImSearch} from "react-icons/im" 

const Header = () => {
  return (
    <nav className="header">
        <img src={logo} alt="logo" />

        <div>
          <Link to="/tvshows">TVShows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/recent">Recently Added</Link>
          <Link to="/mylist">My List</Link>
        </div>
        <ImSearch />
        <img src={bell} alt="bell" />
        <img src={avatar} alt="avatar" />  
    </nav>
  ) 
}

export default Header