import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

// Import
import DataBlog from './pages/DataBlog';
import AddBlog from './pages/AddBlog';

import DataKegiatan from './pages/DataKegiatan';
import AddKegiatan from './pages/AddKegiatan';

import DataJurusan from './pages/DataJurusan';
import AddJurusan from './pages/AddJurusan';

import DataKurikulum from './pages/DataKurikulum';
import AddKurikulum from './pages/AddKurikulum';

import DataMapels from './pages/DataMapels';
import AddMapels from './pages/AddMapels';



// IMPORT 
import Homepage from "./view/Homepage";
import Jurusan from './view/Jurusan.jsx';
import Blogpage from './view/Blogpage.jsx';
import Loginpage from './view/Loginpage.jsx';
import Registerpage from './view/Registerpage.jsx';
import Kegiatan from './view/Kegiatan.jsx';
import Targetjurusan from './view/Targetjurusan.jsx';
import DetailJurusan from './view/DetailJurusan.jsx';
import Footer from './view/Footer.jsx';


// IMPORT
import DashboardHome from './pages/DashboardHome.jsx';
import DataUsers from './pages/DataUsers.jsx';
import DataTags from './pages/DataTags.jsx';
import DataTeachers from './pages/DataTeachers.jsx';
import AddTeachers from './pages/AddTeachers.jsx';
import AddTag from './pages/AddTag.jsx';
import ModifyBlog from './pages/ModifyBlog.jsx';
import BlogDetail  from "./view/DetailBlog.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* GIBRAN */}
        <Route path="/" element={<Homepage />} />
        {/* <Route path="Crud" element={<Crud />} /> */}
        <Route path="/Blog" element={<Blogpage />} />
        <Route path="/Jurusan" element={<Jurusan />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Kegiatan" element={<Kegiatan />} />
        <Route path="/Targetjurusan" element={<Targetjurusan />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/jurusan/:id" element={<DetailJurusan />} />
        <Route path="/Footer" element={<Footer />} />


        {/* DAPA */}
        {/* Blog   */}
        <Route path='/data_blog' element={<DataBlog />} />
        <Route path='/add_blog' element={<AddBlog />} />

        {/* Kegiatan   */}
        <Route path='/data_kegiatan' element={<DataKegiatan />} />
        <Route path='/add_kegiatan' element={<AddKegiatan />} />

        {/* Jurusan */}
        <Route path='/data_jurusan' element={<DataJurusan />} />
        <Route path='/add_jurusan' element={<AddJurusan />} />

        {/* Kurikulum */}
        <Route path='/data_kurikulum' element={<DataKurikulum />} />
        <Route path='/add_kurikulum' element={<AddKurikulum />} />

        <Route path='/data_mapels' element={<DataMapels />} />
        <Route path='/add_mapel' element={<AddMapels />} />


        {/* PATRIOT */}
        {/* Users */}

        <Route path='/dashboard/users' element={<DataUsers />} />
        <Route path='/dashboard/home' element={<DashboardHome />} />


        <Route path='/data_tags' element={<DataTags />} />
        <Route path='/add_tag' element={<AddTag />} />
        <Route path='/modify/blog/:id' element={<ModifyBlog />} />
        <Route path='/edit/kegiatan/:id' element={<AddKegiatan />} />

        <Route path='/data_jurusan/teachers/:id/:name' element={<DataTeachers />} />
        <Route path='/add_teacher/:id' element={<AddTeachers />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
