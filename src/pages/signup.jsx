import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const contentType = res.headers.get("content-type") || "";
      let data = {};
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Unexpected server response");
      }
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      if (data.success) {
        toast.success("Account created successfully!");
        navigate("/verify-otp", { state: { email } });
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 pt-28">
      <h1 className="text-3xl font-light mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-6 py-3 focus:outline-none"
        />
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
        <button type="submit" disabled={loading} className="w-full rounded-full bg-black text-white py-3 hover:bg-gray-800 transition disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />}
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Already have account? <Link to="/login" className="underline">Login</Link>
      </p>
    </div>
  );
}
