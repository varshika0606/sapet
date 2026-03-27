import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const Respond = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [violation, setViolation] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`${endpoints.violations}/${id}`).then(({ data }) => setViolation(data));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await api.post(endpoints.responses, { violation: id, responseText });
      setMessage("Response submitted successfully");
      setTimeout(() => navigate("/student/violations"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Submit Response</h2>
        <p className="text-white/60">Provide your explanation for the violation.</p>
      </div>
      {message && <div className="rounded-md bg-emerald-500/20 px-4 py-2 text-sm">{message}</div>}
      {error && <div className="rounded-md bg-rose-500/20 px-4 py-2 text-sm">{error}</div>}
      <div className="rounded-xl bg-white/5 p-6">
        <p className="text-xs text-white/50">Policy: {violation?.policy?.title}</p>
        <p className="text-sm text-white/70 mb-4">{violation?.description}</p>
        <form onSubmit={submit} className="space-y-4">
          <textarea
            className="w-full rounded-md bg-white/10 border border-white/10 text-white"
            rows="5"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            required
          />
          <button className="rounded-md bg-accent px-4 py-2 font-semibold text-ink">Submit Response</button>
        </form>
      </div>
    </div>
  );
};

export default Respond;
