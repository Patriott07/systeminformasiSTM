import { useState, useEffect, useRef } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { headers, serverPort } from "../utls/global_variable.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const DataBlog = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  const galleryRef = useRef < HTMLTableElement > null;
  const [images, setImages] = useState([]);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
  }, []);

  const [blogs, setBlogs] = useState([]);

  const [countData, setCountData] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);

  const [isOpenSidebar, setOpenSideBar] = useState(false);

  const checkScreenWidth = async () => {
    if (window.innerWidth < 560) { // dalam pixel
      // state layar hp
      setOpenSideBar(true);
    } else if (window.innerWidth < 980) {
      // state layar tablet
      setOpenSideBar(false);

    } else {
      // state laptop
      setOpenSideBar(true);
    }
    // cek layar screen
    console.log(window.innerWidth)
  }

  const openEditModal = (data) => {
    setEditData(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    handleFetchBlogs(e.target[0].value);
  };

  // FUngsi ketika ada perubahan pada currentPagination
  const handleChangePagination = (num) => {
    if (num > 0 && num < pagination + 1) {
      setCurrentPagination(num);
    }
  };

  useEffect(() => {
    handleFetchBlogs();
  }, [currentPagination]);

  useEffect(() => {
    checkScreenWidth();
    handleFetchBlogs();
  }, []);

  const handleFetchBlogs = async (SQ) => {
    let url = `${serverPort}/blog/get?p=${currentPagination - 1}`;

    if (SQ) {
      url += `&s=${SQ}`;
    }

    try {
      const res = await fetch(url, {
        headers,
      });

      const data = await res.json();
      console.log({ data });

      setBlogs(data.data);
      setPagination(data.pagination.totalPages);
      setCountData(data.pagination.totalItems);

      let image = [];
      data.data.forEach((val, i) => {
        const img = new Image();
        img.src = val.photo;

        image.push({
          src: val.photo,
          w: img.naturalWidth,
          h: img.naturalHeight,
        });
      });

      setImages(image);
    } catch (error) {
      console.log({ message: "Something wrong while fetch blogs", error });
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Data yang dihapus tidak dapat dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`${serverPort}/blog/delete/${id}`, {
            method: "DELETE",
            headers,
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          Swal.fire("Successfully", data.message, "success");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log({ error });
      Swal.fire("Something wrong!", error.message, "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">

        {isOpenSidebar ? (
          <Side />
        ) : null}

        {/* Button untuk tablet */}
        <div className="absolute top-[30px] right-[30px] z-10">
          <button
            onClick={() => {
              console.log({ isOpenSidebar })
              setOpenSideBar(isOpenSidebar ? false : true)
            }}

            type="button"
            className=" p-3 bg-blue-500 items-center hidden z-[30] sm:flex lg:hidden mt-2 text-sm text-white rounded-lg "
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
        </div>

        <div className="relative pb-8 overflow-x-auto shadow-md sm:rounded-lg lg:w-9/12 m-10">
          <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
            <div className="font-semibold text-3xl text-white">
              Data Blog
            </div>
            <p className=" text-white uppercase mt-2 font-semibold">
              Mulai Kelola Blog ({countData} items)
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center lg:justify-between bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">
            <div className="pb-4 bg-white dark:bg-gray-900 p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none"></div>
                <form
                  onSubmit={handleSubmitSearch}
                  className="lg:flex items-start"
                >
                  <input
                    type="text"
                    id="table-search"
                    className="flex md:min-w-72 md:max-w-40 w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-55 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />

                  <button
                    type="submit"
                    class="flex min-w-full lg:max-w-[3rem] lg:min-w-[3rem] p-2 lg:mx-2 justify-center items-center text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-4 h-4 text-lg"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </form>
              </div>
            </div>
            <Link
              to="/add_blog"
              className="ms-2 w-40 flex flex-col text-white bg-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Tambah Data
            </Link>
          </div>
          <div className="overflow-x-auto w-12/12 mx-7 lg:m-auto">
            <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    like
                  </th>
                  <th scope="col" className="px-9 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody id="gallery">
                {blogs.length > 0
                  ? blogs.map((val, _i) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4">{_i + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                      >
                        {val.title}
                      </th>
                      <td className="px-6 py-4">
                        {/* <img
                        src={val.photo}
                        className="w-20 h-20 rounded-sm object-cover"
                        alt=""
                      /> */}

                        <a
                          //  onClick={(e) => e.preventDefault()}
                          target="_blank"
                          href={images[_i]["src"]}
                          data-pswp-width={images[_i]["w"]}
                          data-pswp-height={images[_i]["h"]}
                        >
                          <img
                            src={images[_i]["src"]}
                            alt={`Thumbnail ${_i}`}
                            width="100"
                            style={{ cursor: "pointer" }}
                          />
                        </a>
                      </td>
                      <td>{val.date}</td>
                      <td className="px-6 py-4 flex flex-wrap gap-1">
                        {val.tags.map((tag) => {
                          return (
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                              {tag}
                            </span>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4">2024-08-21</td>
                      <td className="px-6 py-4 flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/modify/blog/${val._id}`)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            >
                              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                            </g>
                          </svg>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(val._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>

          <nav
            aria-label="Page navigation example"
            className="ms-11 mt-4 flex items-between justify-between"
          >
            <ul className="flex gap-2 -space-x-px text-sm">
              {Array.from({ length: pagination }).map((_i, i) => {
                if (i + 1 == currentPagination) {
                  return (
                    <div className="py-3 px-7 bg-[#005A8F] dark:bg-[#FFD166] text-white rounded-[5px]">
                      {i + 1}
                    </div>
                  );
                } else {
                  return (
                    <div
                      onClick={() => {
                        handleChangePagination(i + 1);
                      }}
                      className="py-3 px-4 rounded-[5px] bg-[#272727] dark:bg-[#073B4C] text-white cursor-pointer"
                    >
                      {i + 1}
                    </div>
                  );
                }
              })}
            </ul>
          </nav>
        </div>
      </div>

      <Footer />

      {isEditModalOpen && (
        <EditModal data={editData} onClose={closeEditModal} />
      )}
    </div>
  );
};

const EditModal = ({ data, onClose }) => {
  const [id, setId] = useState(data.id);
  const [title, setTitle] = useState(data.title);
  const [contens, setContens] = useState(data.contens);
  const [photo_cover, setPhotoCover] = useState(data.photo_cover);
  const [tags, setTags] = useState(data.tags);
  const [date, setDate] = useState(data.date);

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          Edit Data
        </h2>

        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          placeholder="Masukkan Title..."
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contens
            </label>
            <input
              type="file"
              onChange={(e) => setContens(e.target.files[0])}
              className="w-full ps-3 h-[40px] border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:hover:bg-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PhotoCover
            </label>
            <input
              type="file"
              onChange={(e) => setPhotoCover(e.target.files[0])}
              className="w-full ps-3 h-[40px] border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:hover:bg-blue-600"
            />
          </div>
          {/* Kolom Kanan (Full Deskripsi) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          placeholder="Tambahkan Tags..."
        />

        {/* Tombol Aksi */}
        <div className="flex justify-end uppercase space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span> Batal</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataBlog;
