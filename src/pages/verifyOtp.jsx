import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      if (el) el.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: code }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/login");
    } else {
      setMessage(data.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.success ? "OTP resent" : data.message);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 pt-28">
      <h1 className="text-3xl font-light mb-6 text-center">Verify OTP</h1>
      <p className="text-center text-gray-600 mb-6">{email}</p>
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="flex gap-2 justify-center">
          {otp.map((v, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none"
            />
          ))}
        </div>
        {message && <p className="text-center text-red-600 text-sm">{message}</p>}
        <button type="submit" className="w-full rounded-full bg-black text-white py-3 hover:bg-gray-800 transition">
          Verify
        </button>
      </form>
      <button onClick={handleResend} className="w-full mt-4 text-gray-600 underline">
        Resend OTP
      </button>
      <p className="text-center mt-4 text-gray-600">
        <Link to="/login" className="underline">Back to Login</Link>
      </p>
    </div>
  );
}
