import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Home() {
  const { state, dispatch } = useWorkoutContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}`);
        const json = await response.json();
        setError(null);
        setLoading(false);
        if (response.ok) {
          setError(null);
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        setLoading(false);
        return setError(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <WorkoutForm />
      {loading ? <Loading /> : null}
      {error ? <Error label={error.toString()} /> : null}
      <div className="workouts">
        {!state.workouts?.length
          ? null
          : state.workouts.map((item) => {
              return <WorkoutDetails key={item._id} workout={item} />;
            })}
      </div>
    </div>
  );
}

export default Home;
