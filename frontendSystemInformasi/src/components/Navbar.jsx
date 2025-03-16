import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { serverPort, headers } from "../utls/global_variable";

const Navbar = ({ size, opt, name, logoChange }) => {
  if (opt != null) {
    console.log("option not null")
  }

  const handleGetContentCMS = async () => {
    try {
      const res = await fetch(`${serverPort}/cms/get`, headers);
      const data = await res.json();
      console.log({ data })
      setProps(data.cms);

    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    handleGetContentCMS();
  }, [])

  const [props, setProps] = useState({
    _id: "",
    name_website: "",
    logo: "",
    header_text: "",
    slogan: "",
    cover_background: "",

    info1: "",
    info2: "",
    info3: "",


    section1_title: "",
    section1_description: "",
    section1_image: "",


    section2_title: "",
    section2_description: "",
    section2_image: "",


    section3_title: "",
    section3_description: "",
    section3_image: "",


    alamat_telp: "",
    email: "",
    alamat_sekolah: "",
    gps_map_link: ""

  })

  return (
    <nav className={size != '' ? `${size} bg-blue-900/60 text-white rounded-sm overflow-hidden lg:py-4 py-4 fixed top-0 z-50` : `w-screen bg-blue-900/60 text-white rounded-sm overflow-hidden lg:py-4 py-4 fixed top-0 z-50`}>
      <div className="md:w-10/12 mx-auto flex sm:flex-row flex-col justify-between items-center">
        <div className="flex items-center gap-2 me-auto sm:me-0 px-4 py-2 sm:px-0 sm:py-0">
          {opt != null ? (
            <img src={logoChange} alt="" width={40} />
          ) : (
            <img src={props.logo} alt="" width={40} />
          )}
          {opt != null ? (
            <h1 className="lg:text-2xl text-sm font-bold">{name}</h1>
          ) : (
            <h1 className="lg:text-2xl text-sm font-bold">{props.name_website}</h1>
          )}
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