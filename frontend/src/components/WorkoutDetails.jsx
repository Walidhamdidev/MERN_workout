import React from "react";

function WorkoutDetails({ workout }) {
  return (
    <div className="workout">
      <span className="title">Title: </span>
      {workout.title}
      <span className="load">Load: </span>
      {workout.load}

      <span className="reps">Reps: </span>
      {workout.reps}
    </div>
  );
}

export default WorkoutDetails;
