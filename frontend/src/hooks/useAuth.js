import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useWorkoutContext from "./useWorkoutContext";

const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();

  const userSignup = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await response.json();
      setLoading(false);
      if (!response.ok) setError("Incorrect credentials");
      if (response.ok) {
        setError(null);
        dispatch({ type: "LOGIN", payload: json });
        localStorage.setItem("user", JSON.stringify(json));
      }
    } catch (error) {
      console.log(error.message);
      return setError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  const userLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();
      setLoading(false);
      if (!response.ok) setError("Incorrect credentials");
      if (response.ok) {
        setError(null);
        dispatch({ type: "LOGIN", payload: json });
        localStorage.setItem("user", JSON.stringify(json));
      }
    } catch (error) {
      console.log(error.message);
      return setError(error.message);
    }
  };

  return { userSignup, userLogin, logout, loading, error, setError };
};

export default useAuth;
