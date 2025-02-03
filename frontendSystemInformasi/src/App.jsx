import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

// Import
import CrudBlog from './pages/CrudBlog';

function App() {
 
  return(
    <BrowserRouter>
      <Routes>
      {/* Tempat list page */}
      <Route path='/blog' element={<CrudBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
