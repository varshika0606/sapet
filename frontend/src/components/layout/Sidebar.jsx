import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const linksByRole = {
    admin: [
      { to: "/admin", label: "Overview" },
      { to: "/admin/policies", label: "Policies" },
      { to: "/admin/violations", label: "Violations" },
      { to: "/admin/decisions", label: "Decisions" },
      { to: "/admin/analytics", label: "Analytics" },
    ],
    faculty: [
      { to: "/faculty", label: "Overview" },
      { to: "/faculty/report", label: "Report Violation" },
      { to: "/faculty/reports", label: "My Reports" },
    ],
    student: [
      { to: "/student", label: "Overview" },
      { to: "/student/violations", label: "My Violations" },
    ],
  };

  const links = linksByRole[user?.role] || [];

  return (
    <aside className="w-64 shrink-0 bg-ink/90 text-white min-h-[calc(100vh-72px)] p-6 hidden lg:block">
      <h2 className="font-display text-xl mb-6">SAPET</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive ? "bg-accent text-ink" : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
