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
      <Route path='/data_jurusan' element={<DataJurusan />} />
      <Route path='/add_jurusan' element={<AddJurusan />} />
      
      {/* Kurikulum */}
      <Route path='/data_kurikulum' element={<DataKurikulum />} />
      <Route path='/add_kurikulum' element={<AddKurikulum />} />
    
      </Routes>
    </BrowserRouter>
  )
}

export default App
