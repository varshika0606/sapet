import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const authedUser = await login(form);
      const role = authedUser?.role || "student";
      navigate(`/${role}`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-slate to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 shadow-soft border border-white/10">
        <h1 className="font-display text-2xl mb-2">Welcome back</h1>
        <p className="text-white/60 mb-6">Log in to continue managing academic policy cases.</p>
        {error && <div className="mb-4 rounded-md bg-rose-500/20 px-4 py-2 text-sm">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              required
              autoComplete="off"
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-ink">Login</button>
        </form>
        <p className="mt-4 text-sm text-white/60">
          New here? <Link className="text-accent" to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
