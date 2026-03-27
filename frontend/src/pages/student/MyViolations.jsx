import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import StatusBadge from "../../components/common/StatusBadge";

const MyViolations = () => {
  const [items, setItems] = useState([]);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    api.get(endpoints.violations).then(({ data }) => setItems(data.items || []));
    api.get(endpoints.decisions).then(({ data }) => setDecisions(data || []));
  }, []);

  const decisionByViolationId = (id) =>
    decisions.find((d) => String(d.violation?._id || d.violation) === String(id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">My Violations</h2>
        <p className="text-white/60">Review your reported cases and respond if needed.</p>
      </div>
      <div className="space-y-3">
        {items.map((v) => (
          <div key={v._id} className="rounded-lg border border-white/10 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/50">{v.policy?.title}</p>
                <h4 className="font-semibold">{v.description}</h4>
                <p className="text-sm text-white/70">Reported by {v.faculty?.name}</p>
                {decisionByViolationId(v._id) && (
                  <div className="mt-2 text-sm text-white/70">
                    <p>
                      Decision: <span className="capitalize">{decisionByViolationId(v._id)?.decision}</span>
                    </p>
                    <p>Action: {decisionByViolationId(v._id)?.action || "Nil"}</p>
                    <p>Notes: {decisionByViolationId(v._id)?.notes || "No notes"}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={v.status} />
                {v.status === "pending" && (
                  <Link className="text-xs text-accent" to={`/student/respond/${v._id}`}>
                    Submit Response
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyViolations;
