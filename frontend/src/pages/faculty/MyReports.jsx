import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import StatusBadge from "../../components/common/StatusBadge";

const MyReports = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(endpoints.violations).then(({ data }) => setItems(data.items || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">My Reports</h2>
        <p className="text-white/60">Track the status of your submitted reports.</p>
      </div>
      <div className="space-y-3">
        {items.map((v) => (
          <div key={v._id} className="rounded-lg border border-white/10 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/50">{v.policy?.title}</p>
                <h4 className="font-semibold">
                  {v.student?.name} ({v.student?.studentId || "ID"})
                </h4>
                <p className="text-sm text-white/70">{v.description}</p>
              </div>
              <StatusBadge status={v.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;
