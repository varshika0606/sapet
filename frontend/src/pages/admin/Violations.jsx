import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";

const Violations = () => {
  const [items, setItems] = useState([]);
  const [responses, setResponses] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const fetchViolations = async (nextPage = 1) => {
    const { data } = await api.get(endpoints.violations, {
      params: { page: nextPage, limit: 8, q: query || undefined, status: status || undefined },
    });
    setItems(data.items);
    setTotal(data.total);
    setPage(data.page);
  };

  useEffect(() => {
    fetchViolations(1);
  }, []);

  useEffect(() => {
    api.get(endpoints.responses).then(({ data }) => setResponses(data || []));
  }, []);

  useEffect(() => {
    fetchViolations(1);
  }, [status]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchViolations(1);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const withdraw = async (id) => {
    if (!confirm("Withdraw this violation? This hides it from normal views.")) return;
    await api.patch(`${endpoints.violations}/${id}/withdraw`);
    setItems((prev) => prev.filter((v) => v._id !== id));
    fetchViolations(1);
  };

  const responseByViolationId = (id) =>
    responses.find((r) => String(r.violation?._id || r.violation) === String(id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Violations</h2>
        <p className="text-white/60">Review and monitor all submitted violations.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          className="rounded-md bg-white/10 border border-white/10 text-white px-3 py-2"
          placeholder="Search descriptions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded-md bg-white/10 border border-white/10 text-white px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
          <option value="reviewed">Reviewed</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
        <button
          onClick={() => fetchViolations(1)}
          className="rounded-md bg-accent px-4 py-2 font-semibold text-ink"
        >
          Apply
        </button>
      </div>

      <div className="rounded-xl bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Cases</h3>
          <Pagination page={page} total={total} limit={8} onPage={fetchViolations} />
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-white/60">No violations found.</p>
        ) : (
          <div className="space-y-3">
            {items.map((v) => (
              <div key={v._id} className="rounded-lg border border-white/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/50">Policy: {v.policy?.title}</p>
                    <h4 className="font-semibold">
                      {v.student?.name} ({v.student?.studentId || "ID"})
                    </h4>
                    <p className="text-sm text-white/70">{v.description}</p>
                    <p className="text-xs text-white/50">Reported by {v.faculty?.name}</p>
                    {responseByViolationId(v._id)?.responseText && (
                      <p className="mt-2 text-sm text-white/70">
                        Student Response: {responseByViolationId(v._id)?.responseText}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={v.status} />
                    {v.status !== "withdrawn" && (
                      <button
                        onClick={() => withdraw(v._id)}
                        className="rounded-md border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Violations;
