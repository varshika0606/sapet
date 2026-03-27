const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-500/20 text-yellow-300",
    responded: "bg-blue-500/20 text-blue-300",
    reviewed: "bg-purple-500/20 text-purple-300",
    approved: "bg-emerald-500/20 text-emerald-300",
    rejected: "bg-rose-500/20 text-rose-300",
    withdrawn: "bg-slate-500/20 text-slate-300",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-white/10"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
