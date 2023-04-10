import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const {
    state: { user },
  } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/workouts/${workout._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      setLoading(false);
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workout">
      <span className="title">Title: </span>
      {workout.title}
      <span className="load">Load: </span>
      {workout.load}

      <span className="reps">Reps: </span>
      {workout.reps}
      <button
        disabled={loading}
        className="btn-form btn-delete"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default WorkoutDetails;
