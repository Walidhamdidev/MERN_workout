import { useContext } from "react";
import { WorkoutsContext } from "../context/workout";

const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) throw Error("Context should be inside provider tree!");

  return context;
};

export default useWorkoutContext;
