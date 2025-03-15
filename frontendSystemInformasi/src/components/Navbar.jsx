import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = ({size}) => {
    return(
        <nav className={size != '' ? `${size} bg-blue-900/60 text-white rounded-sm overflow-hidden lg:py-4 py-4 fixed top-0 z-50` :`w-screen bg-blue-900/60 text-white rounded-sm overflow-hidden lg:py-4 py-4 fixed top-0 z-50`}>
                <div className="md:w-10/12 mx-auto flex sm:flex-row flex-col justify-between items-center">
                  <div className="flex items-center gap-2 me-auto sm:me-0 px-4 py-2 sm:px-0 sm:py-0">
                    <img src={logo} alt="" width={40} />
                    <h1 className="lg:text-2xl text-sm font-bold">SMKN 1 CIREBON</h1>
                  </div>
                  <div className="flex ms-auto sm:ms-0 sm:px-0 px-8 gap-4 lg:gap-8">
                    <Link to="/" className="hover:text-blue-400 lg:text-base text-xs font-medium hover:pe-2 transition-all duration-300">
                      Home
                    </Link>
                    <Link to="/blog" className="hover:text-blue-400 lg:text-base text-xs font-medium hover:pe-2  transition-all duration-300">
                      Blog
                    </Link>
                    <Link to="/Kegiatan" className="hover:text-blue-400 lg:text-base text-xs font-medium hover:pe-2  transition-all duration-300">
                      Kegiatan
                    </Link>
                    <Link to="/jurusan" className="hover:text-blue-400 lg:text-base text-xs font-medium transition-all hover:pe-2 duration-300">
                      Jurusan
                    </Link>
                  </div>
                </div>
              </nav>
    )
} 

export default Navbar;