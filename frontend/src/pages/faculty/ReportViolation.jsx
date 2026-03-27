import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const ReportViolation = () => {
  const [policies, setPolicies] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ policy: "", student: "", description: "", evidenceUrl: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get(endpoints.policies).then(({ data }) => setPolicies(data.items || []));
    api.get(endpoints.users, { params: { role: "student", limit: 50 } }).then(({ data }) => setStudents(data.items || []));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, val]) => payload.append(key, val));
    if (file) payload.append("evidence", file);
    await api.post(endpoints.violations, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm({ policy: "", student: "", description: "", evidenceUrl: "" });
    setFile(null);
    setMessage("Violation reported successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Report Violation</h2>
        <p className="text-white/60">Submit a new academic policy violation.</p>
      </div>
      {message && <div className="rounded-md bg-emerald-500/20 px-4 py-2 text-sm">{message}</div>}
      <form
        onSubmit={submit}
        className="rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-6 space-y-4 border border-white/10 shadow-soft"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Policy</label>
            <select
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.policy}
              onChange={(e) => setForm({ ...form, policy: e.target.value })}
              required
            >
              <option value="">Select policy</option>
              {policies.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-white/70">Student</label>
            <select
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.student}
              onChange={(e) => setForm({ ...form, student: e.target.value })}
              required
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.studentId || "ID"})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-white/70">Description</label>
          <textarea
            className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Evidence URL (optional)</label>
            <input
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.evidenceUrl}
              onChange={(e) => setForm({ ...form, evidenceUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-white/70">Upload Evidence (optional)</label>
            <input
              type="file"
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <button className="rounded-md bg-accent px-4 py-2 font-semibold text-ink">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportViolation;
