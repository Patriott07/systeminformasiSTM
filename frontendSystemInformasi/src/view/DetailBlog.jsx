import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [allTags, setAllTags] = useState([]); // For storing all tags
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchBlogDetail = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token is missing. Please login.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5050/blog/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });

        const data = await response.json();
        console.log("Data fetched:", data); // Debugging

        if (!response.ok || !data.blog) {
          throw new Error("Failed to fetch blog details");
        }

        setBlog(data.blog); // ✅ Ambil data yang benar
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:5050/blog/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });

        const data = await res.json();
        console.log({ data });

        if (!res.ok) {
          setError(data.message || "Failed to fetch blogs");
          return;
        }

        // Limit to 3 blogs
        const limitedBlogs = data.data.slice(0, 3); // Taking only the first 3 blogs
        setBlogs(limitedBlogs);
        setTotalPages(data.pagination.totalPages);

        // Ambil semua tag unik
        const tags = new Set();
        limitedBlogs.forEach((blog) => {
          blog.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags([...tags]);
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchBlogs();
  }, []); // No dependency on currentPage anymore
  // Hilangkan dependency `currentPage` karena tidak pakai pagination
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p>Blog tidak ditemukan.</p>;

  return (
    <div className="w-full justify-center flex">
      <div className="w-10/12 max-w-5xl bg-white shadow-lg rounded-lg p-6">
        {/* Judul */}
        <div className="w-full flex justify-center">
          <img className="w-[100%] lg:h-[60vh] h-[30vh] object-cover rounded-lg shadow-md" src={blog.photo} alt={blog.title} />
        </div>
        <h1 className="lg:text-3xl mt-2 text-xl font-bold text-gray-800  mb-6">{blog.title}</h1>

        <div className="lg:flex justify-between">
          <div className="lg:max-w-[70%] lg:min-w-[70%] w-full">
            {/* Gambar utama */}

            {/* Konten di kanan */}
            <div className="space-y-4">
              {blog.contents?.map((content, index) => (
                <div key={index}>
                  {content.type === "text" ? (
                    <p className="lg:text-lg text-sm text-gray-700 leading-relaxed">{content.content}</p>
                  ) : content.type === "vidio" ? (
                    <iframe
                      className="w-[90%] lg:min-h-[20rem] h-48 rounded-lg shadow-md"
                      src={content.content}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img className="w-full lg:h-56 lg:hover:h-80 transition-all h-48 object-cover rounded-lg shadow-md" src={content.content} alt="Blog content" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[25%] mt-8 lg:mt-0 w-full flex flex-wrap lg:flex-col gap-2 lg:items-end justify-center lg:justify-end ">
            {blogs.map((blog) => (
              <div key={blog._id} className="lg:min-w-full  relative max-w-[45%] min-w-[45%] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="min-h-[75%] max-h-[75%]">
                  <a href={`/blog/${blog._id}`}>
                    <img className="rounded-t-lg w-full h-32 lg:h-40 object-cover" src={blog.photo} alt={blog.title} />
                  </a>
                  <div className="lg:p-5 p-3">
                    <Link to={`/blog/${blog._id}`}>
                      <h5 className="mb-1 lg:text-sm text-xs  font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                    </Link>
                    <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">{blog.content}</p>
                    <div className="flex flex-wrap gap-1 lg:gap-2 mb-2"></div>
                  </div>
                </div>
                <div className="ml-4 min-h-[20%] max-h-[20%] flex items-end">
                  <Link to={`/blog/${blog._id}`} className="inline-flex items-center lg:px-2 lg:py-1 px-2 py-1 lg:text-xs text-[0.5rem] font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gambar utama & teks */}

        {/* Pemisah */}
        <div className="border-b my-6"></div>

        {/* Tags */}
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-lg text-gray-800">Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {blog.tags?.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
