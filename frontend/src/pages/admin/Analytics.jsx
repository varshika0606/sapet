import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import Pagination from "../../components/common/Pagination";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchLogs = async (nextPage = 1) => {
    const { data } = await api.get(endpoints.auditLogs, { params: { page: nextPage, limit: 8 } });
    setLogs(data.items);
    setTotal(data.total);
    setPage(data.page);
  };

  useEffect(() => {
    api.get(endpoints.analytics).then(({ data }) => setStats(data));
    fetchLogs(1);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Analytics & Audit</h2>
        <p className="text-white/60">Operational insights and audit trail.</p>
      </div>

      <div className="rounded-xl bg-white/5 p-6">
        <h3 className="font-display text-lg mb-4">System Metrics</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-4">
            <p className="text-xs uppercase text-white/50">Violations</p>
            <p className="text-xl font-semibold">{stats?.totalViolations ?? "--"}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-4">
            <p className="text-xs uppercase text-white/50">Responses</p>
            <p className="text-xl font-semibold">{stats?.totalResponses ?? "--"}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-4">
            <p className="text-xs uppercase text-white/50">Decisions</p>
            <p className="text-xl font-semibold">{stats?.totalDecisions ?? "--"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Audit Logs</h3>
          <Pagination page={page} total={total} limit={8} onPage={fetchLogs} />
        </div>
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log._id} className="rounded-lg border border-white/10 p-4">
              <p className="text-xs text-white/50">{log.actor?.name || "System"} - {log.action}</p>
              <p className="text-sm text-white/70">{log.actor?.email || "system@sapet.local"}</p>
              <p className="text-sm text-white/70">{log.entity} {log.entityId}</p>
              <p className="text-xs text-white/40">{new Date(log.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
