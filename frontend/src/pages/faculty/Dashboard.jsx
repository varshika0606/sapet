import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const FacultyDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(endpoints.violations, { params: { limit: 100 } }).then(({ data }) => setData(data.items));
  }, []);

  const counts = data.reduce(
    (acc, v) => ({ ...acc, [v.status]: (acc[v.status] || 0) + 1 }),
    {}
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Faculty Overview</h2>
        <p className="text-white/60">Submit and monitor your violation reports.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(counts).map(([key, val]) => (
          <div key={key} className="rounded-xl bg-white/5 p-5 shadow-soft">
            <p className="text-xs text-white/60">{key}</p>
            <p className="text-2xl font-semibold">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
