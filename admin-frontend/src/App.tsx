import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Login/AdminLogin";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

// Main App Component
const App: React.FC = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </>
  );
};

export default App;
