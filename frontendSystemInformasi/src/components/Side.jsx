import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/Login')
  }


  return (
    <div className="relative w-2/12 ">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-12 overflow-y-auto">
          <Link to={"/"} className="flex mb-8 items-center ps-2.5">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkLp_xT5o_Ad17zhBRpBhHtmKuuXWwGlvmw&s" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
          </Link>
          <ul className="space-y-2 font-medium text-sm">
            <li>
              <Link to="/dashboard/home" className="items-center p-2 text-gray-900 flex gap-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1" /></svg>
                <span className="">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="flex p-2 items-center gap-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2m2 12a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5z" /></svg>
                <span className="">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/data_blog" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 gap-2 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v18h18V3zm15 15H6v-1h12zm0-2H6v-1h12zm0-4H6V6h12z" /></svg>
                <span className="">Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/data_kegiatan" className="flex items-center p-2  gap-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><rect width="30" height="30" x="6" y="6" rx="2" /><path stroke-linecap="round" d="M42 12v27a3 3 0 0 1-3 3H12M6 25l7.656-6.806a2 2 0 0 1 2.674.015L26 27" /><path stroke-linecap="round" d="m22 23l4.785-3.988a2 2 0 0 1 2.48-.063L36 24M6 19v8m30-8v8" /></g></svg>
                <span className="">Kegiatan</span>
              </Link>
            </li>
            <li>
              <Link to="/data_jurusan" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.825 0-1.412-.587T2 16V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v11q0 .825-.587 1.413T20 18zm-3 3v-2h22v2z" /></svg>
                <span className="">Jurusan</span>
              </Link>
            </li>
            <li>
              <Link to="/data_kurikulum" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm4 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM5 8h4m0 8h4" /><path d="m13.803 4.56l2.184-.53c.562-.135 1.133.19 1.282.732l3.695 13.418a1.02 1.02 0 0 1-.634 1.219l-.133.041l-2.184.53c-.562.135-1.133-.19-1.282-.732L13.036 5.82a1.02 1.02 0 0 1 .634-1.219zM14 9l4-1m-2 8l3.923-.98" /></g></svg>
                <span className="">Kurikulum</span>
              </Link>
            </li>
            <li>
              <Link to="/data_tags" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" /><path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" /></g></svg>
                <span className="">Tags</span>
              </Link>
            </li>
            <li>
              <button onClick={() => handleLogout()} type="submit" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.796 2.244C12.653 1.826 14 3.422 14 5v14c0 1.578-1.347 3.174-3.204 2.756C6.334 20.752 3 16.766 3 12s3.334-8.752 7.796-9.756m5.497 6.049a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L17.586 13H9a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414" clip-rule="evenodd" /></svg>
                <span className="">Logout Account</span>

              </button>

            </li>

          </ul>
        </div>
      </aside>
    </div>
  );
}
