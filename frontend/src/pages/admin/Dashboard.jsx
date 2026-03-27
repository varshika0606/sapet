import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get(endpoints.analytics).then(({ data }) => setStats(data));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Admin Overview</h2>
        <p className="text-white/60">Track policy enforcement at a glance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white/5 p-5 shadow-soft">
          <p className="text-xs text-white/60">Total Violations</p>
          <p className="text-2xl font-semibold">{stats?.totalViolations ?? "--"}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-5 shadow-soft">
          <p className="text-xs text-white/60">Total Policies</p>
          <p className="text-2xl font-semibold">{stats?.totalPolicies ?? "--"}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-5 shadow-soft">
          <p className="text-xs text-white/60">Responses</p>
          <p className="text-2xl font-semibold">{stats?.totalResponses ?? "--"}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-5 shadow-soft">
          <p className="text-xs text-white/60">Decisions</p>
          <p className="text-2xl font-semibold">{stats?.totalDecisions ?? "--"}</p>
        </div>
      </div>
      <div className="rounded-xl bg-white/5 p-6 shadow-soft">
        <h3 className="font-display text-lg mb-4">Status Breakdown</h3>
        <div className="grid gap-3 md:grid-cols-5">
          {Object.entries(stats?.statusBreakdown || {}).map(([key, val]) => (
            <div key={key} className="rounded-lg bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50">{key}</p>
              <p className="text-xl font-semibold">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
