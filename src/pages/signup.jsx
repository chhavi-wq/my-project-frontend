import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      navigate("/verify-otp", { state: { email } });
    } else {
      alert(data.message);
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
        <button type="submit" className="w-full rounded-full bg-black text-white py-3 hover:bg-gray-800 transition">
          Sign Up
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Already have account? <Link to="/login" className="underline">Login</Link>
      </p>
    </div>
  );
}
