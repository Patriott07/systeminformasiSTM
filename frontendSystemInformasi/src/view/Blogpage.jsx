import React, { useState, useEffect } from "react";
import Poster from "../assets/poster.webp";

const Blogpage = () => {
  const [currentPageCategory1, setCurrentPageCategory1] = useState(1);
  const [currentPageCategory2, setCurrentPageCategory2] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) { // iPhone 14 Pro width
        setBlogsPerPage(4);
      } else {
        setBlogsPerPage(6);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5050/blog/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": `${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch blogs");
          return;
        }
          console.log({data})
        setBlogs(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (

    <>
    
    <nav className="w-full bg-gray-900 text-white py-4 fixed top-0 z-50">
        <div className="w-10/12 mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SMA BAKTI KOTA CIREBON</h1>
          <div className="flex gap-8">
            <a href="/" className="hover:text-blue-400">
              Home
            </a>
            <a href="blog" className="hover:text-blue-400">
              Blog
            </a>
            <a href="/Kegiatan" className="hover:text-blue-400">
              Kegiatan
            </a>
            <a href="/jurusan" className="hover:text-blue-400">
              Jurusan
            </a>
          </div>
        </div>
      </nav>

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-10/12">
      <h1 className="text-2xl font-bold mb-4">Blog Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg w-full h-48 object-cover" src={blog.photo} alt={blog.title} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
              </a>
              <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">{blog.content}</p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} rounded-lg`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
    </>

  );
};

export default Blogpage;