import { useContext } from "react";
import { AuthContext } from "../context/auth";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw Error("Context should be inside provider tree!");

  return context;
};

export default useAuthContext;
