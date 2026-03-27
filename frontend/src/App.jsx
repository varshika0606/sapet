import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import Policies from "./pages/admin/Policies";
import Violations from "./pages/admin/Violations";
import Decisions from "./pages/admin/Decisions";
import Analytics from "./pages/admin/Analytics";
import FacultyDashboard from "./pages/faculty/Dashboard";
import ReportViolation from "./pages/faculty/ReportViolation";
import MyReports from "./pages/faculty/MyReports";
import StudentDashboard from "./pages/student/Dashboard";
import MyViolations from "./pages/student/MyViolations";
import Respond from "./pages/student/Respond";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={<ProtectedRoute roles={["admin"]} />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="policies" element={<Policies />} />
        <Route path="violations" element={<Violations />} />
        <Route path="decisions" element={<Decisions />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route
        path="/faculty"
        element={<ProtectedRoute roles={["faculty"]} />}
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="report" element={<ReportViolation />} />
        <Route path="reports" element={<MyReports />} />
      </Route>

      <Route
        path="/student"
        element={<ProtectedRoute roles={["student"]} />}
      >
        <Route index element={<StudentDashboard />} />
        <Route path="violations" element={<MyViolations />} />
        <Route path="respond/:id" element={<Respond />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
