import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/10 bg-ink/95 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Secure Academic Policy Enforcement Tool</p>
          <h1 className="font-display text-lg">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-white/60 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
