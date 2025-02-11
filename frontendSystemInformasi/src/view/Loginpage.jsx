import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        setMessage(null);
        return;
      }

      // Pastikan token ada sebelum menyimpannya
      if (data.token) {
        console.log("Token received:", data.token); // Log token to console
        localStorage.setItem("token", data.token);
        setMessage("Login berhasil");
        setError(null);
        navigate("/blog"); // Redirect to homepage or any other page
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setMessage(null);
    }
  };


    return (
   <>
   <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side (Login) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign in</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          <p className="text-center text-gray-500 mb-4">atau gunakan akun anda</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4"
              required
            />
            <p className="text-sm text-blue-500 text-right mb-4 cursor-pointer">Lupa kata sandi anda?</p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Right Side (Sign Up) */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold">Halo, Teman!</h2>
          <p className="text-center text-white mt-4">Belum Punya Akun? Anda Dapat Langsung Register Melalui Button Dibawah</p>
          <a href="/register" className="mt-6 border border-white text-white py-2 px-6 rounded hover:bg-white hover:text-blue-600">Register</a>
        </div>
      </div>
    </div>
   </>
    );
    };

export default Loginpage;