import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("userId", data.data._id);
      navigate("/");
    } else {
      toast.error("Not logged in, signup first");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 pt-28">
      <h1 className="text-3xl font-light mb-6 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none"
        />
        <button type="submit" className="w-full rounded-full bg-black text-white py-3 hover:bg-gray-800 transition">
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        No account? <Link to="/signup" className="underline">Sign up</Link>
      </p>
    </div>
  );
}
