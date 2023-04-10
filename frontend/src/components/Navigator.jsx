import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useAuth from "../hooks/useAuth";

function Navigator() {
  const { state } = useAuthContext();
  const { logout } = useAuth();

  return (
    <header className="header container">
      <div className="logo">Workout Buddy</div>
      <div className="nav-links">
        {state && state.user ? (
          <>
            <Link className="nav-link" to="/">
              Home
            </Link>

            <button className="nav-link btn-form" onClick={logout}>
              Logout
            </button>
            <p>{state.user.email}</p>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navigator;
