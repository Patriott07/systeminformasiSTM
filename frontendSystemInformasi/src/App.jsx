import {BrowserRouter, Routes, Route} from 'react-router-dom';
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



//Import
import Homepage from "./view/Homepage";
import Jurusan from './view/Jurusan.jsx';
import Blogpage from './view/Blogpage.jsx';
import Loginpage from './view/Loginpage.jsx';
import Registerpage from './view/Registerpage.jsx';
import Kegiatan from './view/Kegiatan.jsx';
import Targetjurusan from './view/Targetjurusan.jsx';



function App() {
 
  return(
    <BrowserRouter>
      <Routes>
      {/* Blog   */}
      <Route path='/data_blog' element={<DataBlog />} />
      <Route path='/add_blog' element={<AddBlog />} />

      {/* Kegiatan   */}
      <Route path='/data_kegiatan' element={<DataKegiatan />} />
      <Route path='/add_kegiatan' element={<AddKegiatan />} />
      
      {/* Jurusan */}
      <Route path='/detail_jurusan' element={<DataJurusan />} />
      <Route path='/add_jurusan' element={<AddJurusan />} />
      
      {/* Kurikulum */}
      <Route path='/data_kurikulum' element={<DataKurikulum />} />
      <Route path='/add_kurikulum' element={<AddKurikulum />} />
    


      {/* Gibran */}

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
}

export default App
