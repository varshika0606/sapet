import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const Decisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [violations, setViolations] = useState([]);
  const [form, setForm] = useState({ violation: "", decision: "", action: "", notes: "" });

  const fetchDecisions = async () => {
    const { data } = await api.get(endpoints.decisions);
    setDecisions(data);
  };

  const fetchViolations = async () => {
    const { data } = await api.get(endpoints.violations);
    const items = (data.items || []).filter((v) =>
      ["pending", "responded"].includes(String(v.status || "").toLowerCase())
    );
    setViolations(items);
  };

  useEffect(() => {
    fetchDecisions();
    fetchViolations();
  }, []);

  const withdrawDecision = async (id) => {
    if (!confirm("Withdraw this decision? This will reopen the violation.")) return;
    await api.patch(`${endpoints.decisions}/${id}/withdraw`);
    setDecisions((prev) => prev.filter((d) => d._id !== id));
    fetchViolations();
  };

  const submitDecision = async (e) => {
    e.preventDefault();
    await api.post(endpoints.decisions, form);
    setForm({ violation: "", decision: "approved", action: "", notes: "" });
    fetchDecisions();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Decisions</h2>
        <p className="text-white/60">Finalize violation outcomes.</p>
      </div>

      <form onSubmit={submitDecision} className="rounded-xl bg-white/5 p-6 space-y-4">
        <div>
          <label className="text-sm text-white/70">Violation</label>
          <select
            className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
            value={form.violation}
            onChange={(e) => setForm({ ...form, violation: e.target.value })}
            required
          >
            <option value="">Select violation (pending or responded)</option>
            {violations.map((v) => (
              <option key={v._id} value={v._id}>
                {v.student?.name} ({v.student?.studentId || "ID"}) - {v.policy?.title} [{v.status}]
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Decision</label>
          <select
            className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
            value={form.decision}
            onChange={(e) => setForm({ ...form, decision: e.target.value })}
            required
          >
            <option value="">Select decision</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="disciplinary">Disciplinary Action</option>
          </select>
          </div>
          <div>
            <label className="text-sm text-white/70">Action</label>
            <input
              className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
              placeholder="Action to apply"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-white/70">Notes</label>
          <textarea
            className="mt-1 w-full rounded-md bg-white/10 border border-white/10 text-white"
            rows="3"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <button className="rounded-md bg-accent px-4 py-2 font-semibold text-ink">Submit Decision</button>
      </form>

      <div className="rounded-xl bg-white/5 p-6">
        <h3 className="font-display text-lg mb-4">Recent Decisions</h3>
        {decisions.length === 0 ? (
          <p className="text-sm text-white/60">No recent decisions yet.</p>
        ) : (
          <div className="space-y-3">
            {decisions.map((d) => (
              <div key={d._id} className="rounded-lg border border-white/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/50">
                      {d.violation?.student?.name} ({d.violation?.student?.studentId || "ID"}) - {d.violation?.policy?.title}
                    </p>
                    <p className="font-semibold capitalize">{d.decision}</p>
                    <p className="text-sm text-white/70">{d.action || "No action specified"}</p>
                  </div>
                  {d.status !== "withdrawn" && (
                    <button
                      onClick={() => withdrawDecision(d._id)}
                      className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Decisions;
