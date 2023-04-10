import { useState } from "react";
import Error from "../components/Error";
import useAuth from "../hooks/useAuth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userSignup, loading, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email should not be empty.");
    if (!password) return setError("Password should not be empty.");
    await userSignup(email, password);
  };

  return (
    <div className="container">
      {error ? <Error label={error} /> : null}
      <form onSubmit={handleSubmit} className="form">
        <h1>Sign Up</h1>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} className="btn-form" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
