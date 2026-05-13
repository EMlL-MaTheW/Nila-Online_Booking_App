import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/login/", form);

      // ✅ store tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // optional: store user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ redirect back (important for booking flow)
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);

    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("Server error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2fff2] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3 text-xs text-gray-400 text-center">
            Don't have an account?
            <a href="/register" className="ms-1 text-green-600">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;