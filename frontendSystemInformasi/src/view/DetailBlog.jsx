import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { headers, serverPort } from '../utls/global_variable.js';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(null);
  const [showFeedback, setShowFeedback] = useState(true);
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
        setComments(data.blog.comments);
        setLikeCount(data.blog.like);

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

  const handleSubmitComment = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${serverPort}/blog/get/${id}/create/comment`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: e.target[1].value,
          comment: e.target[0].value,
        })
      });

      const data = await response.json();
      console.log("Comment Submited:", { data }); // Debugging

      setComments([...comments, { name: e.target[1].value, comment: e.target[0].value, date: "Baru saja.." }])

      Swal.fire("Succesfully", data.message, 'success')

      const buttonReset = document.getElementById('reset-button');
      buttonReset.click();

    } catch (error) {
      console.log({ error })
    }
  }

  const handleFeedback = async (like) => {
    setShowFeedback(false);
    console.log({ like })
    if (like) {
      // kirim like ke server
      const response = await fetch(`${serverPort}/blog/post/${id}/like`, {
        method: "POST",
        body: JSON.stringify({}),
        headers
      });

      const data = await response.json();
      console.log("like:", { data }); // Debugging

      setLikeCount(likeCount + 1);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p>Blog tidak ditemukan.</p>;

  return (
    <div className="w-full justify-center flex">
      <div className="w-10/12 max-w-5xl bg-white shadow-lg rounded-lg p-6">
        {/* Judul */}
        <p className="text-sm text-gray-500 font-semibold mb-3 cursor-pointer" onClick={() => window.history.back()}>{'<-'} Back to main menu</p>
        <div className="w-full flex justify-center">
          <img className="w-[100%] lg:h-[60vh] h-[30vh] object-cover rounded-lg shadow-md" src={blog.photo} alt={blog.title} />
        </div>
        <h1 className="lg:text-3xl mt-6 text-xl font-bold text-gray-800  mb-6">{blog.title}</h1>

        <div className="lg:flex justify-between">
          <div className="lg:max-w-[70%] lg:min-w-[70%] w-full">
            {/* Gambar utama */}

            {/* Konten di kanan */}
            <div className="space-y-4 py-4">
              <div className="flex-col flex gap-3">
                <div className=" flex gap-4">
                  <div className="flex gap-2 items-center font-semibold text-sm text-gray-500">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18" /></svg></p>
                    <p>
                      Created By, {blog.created_by != null ? blog.created_by : "Uknown"}
                    </p>
                  </div>
                </div>

                <div className="mb-2 flex gap-4">
                  <div className="flex gap-2 items-center  text-sm text-gray-500">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><rect width="18" height="15" x="3" y="6" stroke="currentColor" stroke-width="2" rx="2" /><path fill="currentColor" d="M3 10c0-1.886 0-2.828.586-3.414S5.114 6 7 6h10c1.886 0 2.828 0 3.414.586S21 8.114 21 10z" /><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3" /><rect width="4" height="2" x="7" y="12" fill="currentColor" rx=".5" /><rect width="4" height="2" x="7" y="16" fill="currentColor" rx=".5" /><rect width="4" height="2" x="13" y="12" fill="currentColor" rx=".5" /><rect width="4" height="2" x="13" y="16" fill="currentColor" rx=".5" /></g></svg></p>
                    <p>
                      Created on, {blog.date.split('T')[0]}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center  text-sm text-gray-500">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 14h10q.425 0 .713-.288T18 13t-.288-.712T17 12H7q-.425 0-.712.288T6 13t.288.713T7 14m0-3h10q.425 0 .713-.288T18 10t-.288-.712T17 9H7q-.425 0-.712.288T6 10t.288.713T7 11m0-3h10q.425 0 .713-.288T18 7t-.288-.712T17 6H7q-.425 0-.712.288T6 7t.288.713T7 8M4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.612.938T20.3 20.3L18 18z" /></svg></p>
                    <p>
                      {comments.length} people comment
                    </p>
                  </div>
                  <div className="flex gap-2 items-center  text-sm text-gray-500">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.182a.833.833 0 0 1-.821-.969l.663-4.045a4.8 4.8 0 0 0-.09-1.973a1.64 1.64 0 0 0-1.093-1.137l-.145-.047a1.35 1.35 0 0 0-.993.068c-.34.164-.588.463-.68.818l-.476 1.834a7.6 7.6 0 0 1-.656 1.679c-.416.777-1.058 1.4-1.725 1.975l-1.44 1.24a1.67 1.67 0 0 0-.572 1.406l.813 9.393A1.666 1.666 0 0 0 8.596 22h4.649c3.481 0 6.452-2.426 7.024-5.735" /><path fill="currentColor" fill-rule="evenodd" d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749" clip-rule="evenodd" opacity="0.5" /></svg></p>
                    <p>
                      {likeCount} People Like it
                    </p>
                  </div>
                </div>

              </div>
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

              {/* Feedback button */}
              {showFeedback ? (
                <div className="flex gap-2 w-full">
                  <button onClick={() => handleFeedback(true)} type="button" class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20.27 16.265l.705-4.08a1.666 1.666 0 0 0-1.64-1.95h-5.182a.833.833 0 0 1-.821-.969l.663-4.045a4.8 4.8 0 0 0-.09-1.973a1.64 1.64 0 0 0-1.093-1.137l-.145-.047a1.35 1.35 0 0 0-.993.068c-.34.164-.588.463-.68.818l-.476 1.834a7.6 7.6 0 0 1-.656 1.679c-.416.777-1.058 1.4-1.725 1.975l-1.44 1.24a1.67 1.67 0 0 0-.572 1.406l.813 9.393A1.666 1.666 0 0 0 8.596 22h4.649c3.481 0 6.452-2.426 7.024-5.735" /><path fill="currentColor" fill-rule="evenodd" d="M2.968 9.485a.75.75 0 0 1 .78.685l.97 11.236a1.237 1.237 0 1 1-2.468.107V10.234a.75.75 0 0 1 .718-.749" clip-rule="evenodd" opacity="0.5" /></svg>
                    <p>
                      Aku suka blog ini!
                    </p>
                  </button>

                  <button onClick={() => handleFeedback(false)} type="button" class="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z" /></svg>
                    <p>
                      Huftt, Kurang puass
                    </p>
                  </button>

                </div>
              ) : null}

              {/* Comment */}

              <div className="text-2xl">Mulai Berkomentar</div>
              <form onSubmit={handleSubmitComment} className="flex-col flex pb-2 mb-2 border-b">
                <label for="message" class="block mb-2 text-xs  text-gray-500 dark:text-white font-semibold">Tulis Pesan</label>
                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sampaikan Pesan disini.."></textarea>

                <div className="flex gap-2 items-center">
                  <div>
                    <label for="first_name" class="block mb-2 text-xs font-semibold text-gray-500 dark:text-white">Tulis Nama Anda</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-[350px]" placeholder="Tulis namamu disini.." required />
                  </div>



                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16"><path fill="currentColor" d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34q.075.27 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z" /></svg>

                    <p>
                      Submit
                    </p>
                  </button>


                  <button id="reset-button" type="reset" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13.5A7.5 7.5 0 1 1 11.5 6H20m0 0l-3-3m3 3l-3 3" /></svg>
                    <p>
                      Reset form
                    </p>
                  </button>

                </div>
              </form>

              <div className="text-2xl">Comments</div>
              <div className="flex flex-col gap-4">

                {comments.length > 0 ? comments.map((val) => {
                  return (

                    <div className="pb-4 border-b">
                      <div className="text-xl font-semibold text-gray-800">
                        {val.name}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex gap-2 mt-2 items-center  text-sm text-gray-500">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><rect width="18" height="15" x="3" y="6" stroke="currentColor" stroke-width="2" rx="2" /><path fill="currentColor" d="M3 10c0-1.886 0-2.828.586-3.414S5.114 6 7 6h10c1.886 0 2.828 0 3.414.586S21 8.114 21 10z" /><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3" /><rect width="4" height="2" x="7" y="12" fill="currentColor" rx=".5" /><rect width="4" height="2" x="7" y="16" fill="currentColor" rx=".5" /><rect width="4" height="2" x="13" y="12" fill="currentColor" rx=".5" /><rect width="4" height="2" x="13" y="16" fill="currentColor" rx=".5" /></g></svg></p>
                          <p className="text-sm">
                            Posted on, {val.date.split('T')[0]}
                          </p>

                        </div>
                      </div>
                      <p className="w-9/12 mt-2 text-sm text-gray-500">{val.comment}</p>
                    </div>
                  )
                })
                  : (
                    <div className="text-sm text-gray-500 ">Belum ada komentar tersedia, Jadilah yang pertama!!</div>
                  )}
              </div>
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
