import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import useAuthContext from "./hooks/useAuthContext";
import Login from "./pages/Login";

function App() {
  const { state } = useAuthContext();
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route
          path="/"
          element={state.user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/about" element={<About />} />

        <Route
          path="/login"
          element={!state.user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!state.user ? <Signup /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
