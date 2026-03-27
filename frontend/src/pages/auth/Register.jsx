import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    studentId: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-slate to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 shadow-soft border border-white/10">
        <h1 className="font-display text-2xl mb-2">Create account</h1>
        <p className="text-white/60 mb-6">Join the secure academic policy workflow.</p>
        {error && <div className="mb-4 rounded-md bg-rose-500/20 px-4 py-2 text-sm">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="text-sm text-white/80">Name</label>
            <input
              type="text"
              required
              autoComplete="off"
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
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
          <div>
            <label className="text-sm text-white/80">Role</label>
            <select
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {form.role === "student" && (
            <div>
              <label className="text-sm text-white/80">Student ID</label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              />
            </div>
          )}
          <button className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-ink">Register</button>
        </form>
        <p className="mt-4 text-sm text-white/60">
          Already have an account? <Link className="text-accent" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
