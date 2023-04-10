import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import Error from "./Error";
import useAuthContext from "../hooks/useAuthContext";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useWorkoutContext();
  const {
    state: { user },
  } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("You must be authenticated first.");

    if (!title || !load || !reps) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/workouts`,
        {
          method: "POST",
          body: JSON.stringify({ title, load, reps }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      setLoading(false);
      if (response.ok) {
        dispatch({ type: "CREATE_WORKOUT", payload: json });
        setError(null);
        setTitle("");
        setReps(0);
        setLoad(0);
      }

      if (!response.ok) return setError("Response not ok!");
    } catch (error) {
      return setError(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error ? <Error label={error.toString()} /> : null}

      <input
        className="input"
        placeholder="Title"
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        placeholder="Load"
        name="load"
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <input
        className="input"
        placeholder="Reps"
        name="reps"
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button className="btn-form" disabled={loading} type="submit">
        Create
      </button>
    </form>
  );
}

export default WorkoutForm;
