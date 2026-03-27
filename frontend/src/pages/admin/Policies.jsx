import { useEffect, useState } from "react";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import Pagination from "../../components/common/Pagination";

const Policies = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ title: "", code: "", description: "", category: "" });

  const fetchPolicies = async (nextPage = 1) => {
    const { data } = await api.get(endpoints.policies, { params: { page: nextPage, limit: 8 } });
    setItems(data.items);
    setTotal(data.total);
    setPage(data.page);
  };

  useEffect(() => {
    fetchPolicies(1);
  }, []);

  const createPolicy = async (e) => {
    e.preventDefault();
    await api.post(endpoints.policies, form);
    setForm({ title: "", code: "", description: "", category: "" });
    fetchPolicies(1);
  };

  const deletePolicy = async (id) => {
    await api.delete(`${endpoints.policies}/${id}`);
    fetchPolicies(page);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Policies</h2>
        <p className="text-white/60">Create and manage academic policy definitions.</p>
      </div>

      <form onSubmit={createPolicy} className="grid gap-4 rounded-xl bg-white/5 p-6 md:grid-cols-2">
        <input
          className="rounded-md bg-white/10 border border-white/10 text-white"
          placeholder="Policy Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="rounded-md bg-white/10 border border-white/10 text-white"
          placeholder="Policy Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          className="rounded-md bg-white/10 border border-white/10 text-white"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="rounded-md bg-white/10 border border-white/10 text-white"
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button className="md:col-span-2 rounded-md bg-accent px-4 py-2 font-semibold text-ink">Create Policy</button>
      </form>

      <div className="rounded-xl bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Active Policies</h3>
          <Pagination page={page} total={total} limit={8} onPage={fetchPolicies} />
        </div>
        <div className="space-y-3">
          {items.map((policy) => (
            <div key={policy._id} className="rounded-lg border border-white/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">{policy.code}</p>
                  <h4 className="font-semibold">{policy.title}</h4>
                  <p className="text-sm text-white/70">{policy.description}</p>
                </div>
                <button
                  onClick={() => deletePolicy(policy._id)}
                  className="text-xs rounded-md bg-rose-500/20 px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policies;
