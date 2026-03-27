const Pagination = ({ page, total, limit, onPage }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-white/10 px-3 py-1 text-sm disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-sm text-white/70">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= totalPages}
        className="rounded-md border border-white/10 px-3 py-1 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
