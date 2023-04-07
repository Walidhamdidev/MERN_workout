import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Navigator() {
  return (
    <header className="header container">
      <div className="logo">Workout Buddy</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </div>
    </header>
  );
}

export default Navigator;
