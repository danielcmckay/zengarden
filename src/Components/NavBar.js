import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="NavBar">
        <Link to="/">
          <h1>ZenGarden</h1>
          </Link>

          <ul className="NavList">
            <Link to="/favorites">Favorites</Link>
          </ul>
      </div>
    );
  }

export default NavBar;
