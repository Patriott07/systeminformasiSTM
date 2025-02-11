import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./view/Homepage";
import Jurusan from './view/Jurusan.jsx';
import Blogpage from './view/Blogpage.jsx';
import Loginpage from './view/Loginpage.jsx';
import Registerpage from './view/Registerpage.jsx';
import Kegiatan from './view/Kegiatan.jsx';
import Targetjurusan from './view/Targetjurusan.jsx';
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    {/* <Route path="Crud" element={<Crud />} /> */}
    <Route path="Blog" element={<Blogpage />} />
    <Route path="Jurusan" element={<Jurusan />} />
    <Route path="Login" element={<Loginpage />} />
    <Route path="Register" element={<Registerpage />} />
    <Route path="Kegiatan" element={<Kegiatan />} />
    <Route path="Targetjurusan" element={<Targetjurusan />} />

  </Routes>
</BrowserRouter>

)
