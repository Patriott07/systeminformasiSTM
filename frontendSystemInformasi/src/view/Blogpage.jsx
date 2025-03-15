import React, { useState, useEffect } from "react";
import Poster from "../assets/poster.webp";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import SMK from "../assets/smkn1.jpg";

import Footer from "./Footer";
const Blogpage = () => {
  const [currentPageCategory1, setCurrentPageCategory1] = useState(1);
  const [currentPageCategory2, setCurrentPageCategory2] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);
  const [selectedTag, setSelectedTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [indexTarget, setIndexTarget] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1500, once: false });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        // iPhone 14 Pro width
        setBlogsPerPage(4);
      } else {
        setBlogsPerPage(6);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBlogs = async (p) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5050/blog/get?p=${currentPage - 1}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch blogs");
        return;
      }

      setBlogs(data.data);
      setTotalPages(data.pagination.totalPages);

      // Ambil semua tag unik
      const tags = new Set();
      data.data.forEach((blog) => {
        blog.tags.forEach((tag) => tags.add(tag));
      });
      setAllTags([...tags]);

      const randomNum = Math.floor(Math.random() * data.data.length);
      setIndexTarget(randomNum);

    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBlogs();
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const filteredBlogs = selectedTag ? blogs.filter((blog) => blog.tags.includes(selectedTag)) : blogs;

  return (
    <>
    <Navbar size={'w-screen'}/>

      {blogs.length > 0 ? (
        <section style={{
          backgroundImage: `url('${blogs[indexTarget]['photo']}')`
        }} className="flex relative bg-left bg-fixed lg:min-h-screen h-[80vh] max-h-screen bg-cover w-full justify-center items-center">

          {/* bg black */}
          <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full">

          </div>

          <div className="w-10/12 flex flex-col justify-center items-center min-h-screen z-10">
            <h1 className="lg:text-5xl text-3xl lg:p-2 rounded-lg  text-center text-white font-serif mb-4">SELAMAT DATANG DI PORTAL BERITA</h1>
            <h1 className="lg:text-5xl text-3xl lg:p-2 rounded-lg  text-center text-blue-400 font-serif mb-4">SMKN I KOTA CIREBON</h1>
            {/* <p className="max-w-md p-1 lg:text-base text-sm rounded-lg text-center text-white">"Selamat Datang Di Page Kegiatan SMKN I KOTA CIREBON"</p> */}
            <p className="lg:max-w-xl max-w-sm my-4 text-base lg:text-xl font-serif text-white">
              Selamat Datang Di Portal Informasi Sekolah SMKN 1 CIREBON
            </p>
          </div>
        </section>
      ) : null}

      <div className="flex justify-center pb-8 items-center lg:min-h-screen bg-gray-100">
        <div className="w-10/12 mt-[15vh] sm:mt-[20vh]">
          {/* <h1 className="text-2xl font-bold mb-4">Blog Page</h1> */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <span className="mr-2 font-semibold mb-4">Filter by Tag:</span>
            <div className="flex gap-2 flex-wrap py-2">
              <button onClick={() => setSelectedTag("")} className={`lg:px-3 px-2 py-1 mx-1 ${selectedTag === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} text-xs lg:text-base rounded-lg`}>
                All
              </button>
              {allTags.map((tag) => (
                <button key={tag} onClick={() => handleTagFilter(tag)} className={`lg:px-3 px-2 py-1 mx-1 ${selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} text-xs lg:text-base rounded-lg`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBlogs.map((blog) => (
              <div data-aos="fade-up" key={blog._id} className="w-full relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="min-h-[88%] max-h-[88%]">
                  <a href={`/blog/${blog._id}`}>
                    <img className="rounded-t-lg w-full h-32 lg:h-48 object-cover" src={blog.photo} alt={blog.title} />
                  </a>
                  <div className="lg:p-5 p-3">
                    <Link to={`/blog/${blog._id}`}>
                      <h5 className="mb-1 lg:text-lg text-xs font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                    </Link>
                    <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">{blog.content}</p>
                    <div className="flex flex-wrap gap-1 lg:gap-2 mb-2">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[0.5rem] lg:text-xs bg-gray-200 text-gray-700 rounded-full mr-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-4 ">
                  <Link to={`/blog/${blog._id}`} className="inline-flex   items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.5rem]  font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} rounded-lg`}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogpage;