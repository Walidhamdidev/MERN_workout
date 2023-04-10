import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WorkoutProvider from "./context/workout";
import AuthProvider from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </AuthProvider>
  </React.StrictMode>
);
