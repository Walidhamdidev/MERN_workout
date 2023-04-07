import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, load, reps);
    if (!title || !load || !reps) return;
    try {
      setLoading(true);
      const response = await fetch(
        "https://mern-backend-r1eb.onrender.com/api/workouts",
        {
          method: "POST",
          body: JSON.stringify({ title, load, reps }),
          headers: {
            "Content-Type": "application/json",
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
      if (!response.ok) return setError(json.error);
    } catch (error) {
      return setError(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error ? <p>{error}</p> : null}
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
