import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10 text-[17px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
