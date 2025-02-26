import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Registerpage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData));
      const res = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(formData);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
    return(

        <>
     <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side (Register) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Regist Akun Anda</h2>
          <p className="text-center text-gray-500 mb-4">atau gunakan akun anda</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded mb-4" />
            <p className="text-sm text-blue-500 text-right mb-4 cursor-pointer">Lupa kata sandi anda?</p>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">Daftar</button>
          </form>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </div>
        
        {/* Right Side (Sign Up) */}
        <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold text-white">Halo, Teman!</h2>
          <p className="text-center text-white mt-4">Sudah Punya Akun? Anda Dapat Langsung Login Melalui Button Dibawah</p>
          <a href="/login" className="mt-6 border border-white text-white py-2 px-6 rounded hover:bg-white hover:text-blue-600">Login</a>
        </div>
      </div>
    </div>
        </>
    )
}

export default Registerpage;