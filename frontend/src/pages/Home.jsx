import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";

function Home() {
  const { state, dispatch } = useWorkoutContext();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-backend-r1eb.onrender.com/api/workouts"
        );
        const json = await response.json();
        setError(null);
        if (response.ok) {
          setError(null);
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        return setError(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <WorkoutForm />
      <div className="workouts">
        {!state.workouts?.length
          ? { error } && <p>{error}</p>
          : state.workouts.map((item) => {
              return <WorkoutDetails key={item._id} workout={item} />;
            })}
      </div>
    </div>
  );
}

export default Home;
