import { useState, useEffect } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { headers, serverPort } from "../utls/global_variable.js";

import Swal from "sweetalert2";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const DataKurikulum = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [countData, setCountData] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);

  const handleGetJurusan = async () => {
    let url = `${serverPort}/jurusan/get`;

    try {
      const res = await fetch(url, {
        headers,
      });

      const data = await res.json();
      console.log({ data });

      setJurusans(data.data);
    } catch (error) {
      console.log({ message: "Something wrong while fetch Jurusan", error });
    }
  };

  const handleFetchJurusan = async (SQ) => {
    let url = `${serverPort}/jurusan/get?p=${currentPagination - 1}`;

    if (SQ) {
      url += `&s=${SQ}`;
    }

    try {
      const res = await fetch(url, {
        headers,
      });

      const data = await res.json();
      console.log({ data });

      setJurusans(data.data);
    } catch (error) {
      console.log({ message: "Something wrong while fetch Jurusan", error });
    }
  };

  const [images, setImages] = useState([]);
  const [kurikulums, setKurikulums] = useState([]);
  const [jurusan, setJurusans] = useState([]);

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
    handleFetchKurikulum(e.target[0].value);
  };

  // FUngsi ketika ada perubahan pada currentPagination
  const handleChangePagination = (num) => {
    if (num > 0 && num < pagination + 1) {
      setCurrentPagination(num);
    }
  };

  useEffect(() => {
    handleFetchKurikulum();
  }, [currentPagination]);

  useEffect(() => {

    checkScreenWidth();
    handleFetchKurikulum();
    handleFetchJurusan();
    handleGetJurusan();

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  }, []);

  const handleFetchKurikulum = async (SQ) => {
    let url = `${serverPort}/curiculum/get?p=${currentPagination - 1}`;

    if (SQ) {
      url += `&s=${SQ}`;
    }

    try {
      const res = await fetch(url, {
        headers,
      });

      const data = await res.json();
      console.log({ data });

      setKurikulums(data.data);
      setPagination(data.pagination.totalPages);
      setCountData(data.pagination.totalItems);

      let image = [];
      data.data.forEach((val, _i) => {
        let imgs = [];

        val.details_media.forEach((val2, _i2) => {
          let img = document.createElement("img");
          img.src = val2.content;

          imgs.push({
            src: val2.content,
            w: img.naturalWidth,
            h: img.naturalHeight,
          });
        });

        image.push(imgs);
      });

      setImages(image);
      console.log({ image });
    } catch (error) {
      console.log({ message: "Something wrong while fetch users", error });
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
          const res = await fetch(`${serverPort}/curiculum/delete/${id}`, {
            method: "DELETE",
            headers,
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          Swal.fire("Successfully", data.message, "success").then(() => {
            window.location.reload();
          });
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
            className="p-3 bg-red-500 items-center hidden z-[30] sm:flex lg:hidden me-3 mt-3 text-sm text-white rounded-lg"
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

        <div className="relative pb-8 overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-9/12 md:m-10">
          <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
            <div className="font-semibold lg:text-3xl text-xl text-white">
              Data Kurikulum
            </div>
            <p className=" text-white lg:text-[16px] text-xs uppercase mt-2 font-semibold">
              Mulai Kelola Kurikulum Semester SMKN 1 Cirebon ({countData} items)
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center md:justify-between bg-white lg:mt-[20vh] mt-[25vh] px-4 z-[5] lg:w-11/12 mx-auto rounded-t">
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
                    className="flex md:min-w-72 md:max-w-40 w-full py-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-55 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />

                  <button
                    type="submit"
                    class="flex min-w-full lg:max-w-[3rem] lg:min-w-[3rem] p-2 lg:mx-2 justify-center items-center text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-4 h-4"
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
              to="/add_kurikulum"
              className="ms-2 md:w-fit w-52 flex flex-col text-white bg-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Tambah Data
            </Link>
          </div>
          <div className="overflow-x-auto w-12/12 lg:m-auto">
            <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Jurusan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" className="px-6 py-3">
                    year
                  </th>
                  <th scope="col" className="px-9 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {kurikulums.length > 0
                  ? kurikulums.map((val, _i) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{_i + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {val.nama_jurusan}
                        </th>

                        <td>{val.kelas}</td>
                        <td className="px-6 py-4">{val.semester}</td>
                        <td className="px-6 py-4">{val.year}</td>
                        <td className="px-6 py-4 flex flex-col gap-2">
                          <button
                            onClick={() =>
                              openEditModal({
                                ...val,
                                jurusans: jurusan,
                              })
                            }
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
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-purple-500 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
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
                    );
                  })
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
  const { _id, year, kelas, semester, nama_jurusan, jurusans, jurusan } = data;

  const [namaJurusan, setNamaJurusan] = useState(nama_jurusan);
  // const [jurusanValue, setJurusanValue] = useState(nama_jurusan);
  const [selectJurusan, setSelectJurusan] = useState(jurusan);
  const [selectSemester, setSelectSemester] = useState(semester);
  const [selectKelas, setSelectKelas] = useState(kelas);

  useEffect(() => {
    console.log({ data });
    // handleGetJurusan();
  }, []);

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${serverPort}/curiculum/update/${_id}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          nama_jurusan: namaJurusan,
          jurusan: selectJurusan,
          kelas: selectKelas,
          semester: selectSemester,
          year: e.target[3].value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      Swal.fire("Succesfully", data.message, "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log({ error });
      Swal.fire("Something Wrong", error.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmitEdit}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          Edit Data
        </h2>

        <label
          for="countries"
          class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
        >
          Jurusan
        </label>
        <select
          value={selectJurusan}
          id=""
          onChange={(e) => {
            setNamaJurusan(e.target.selectedOptions[0].id);
            setSelectJurusan(e.target.value);
          }}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {jurusans.length > 0
            ? jurusans.map((val, _i) => {
              return (
                <option id={val.name} value={val._id}>
                  {val.name}
                </option>
              );
            })
            : null}
        </select>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Kelas
            </label>
            <select
              onChange={(e) => setSelectKelas(e.target.value)}
              value={selectKelas}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Pilih Kelas</option>
              <option value="10">Kelas Sepuluh (10)</option>
              <option value="11">Kelas Sebelas (11)</option>
              <option value="12">Kelas Dua Belas (12)</option>
            </select>
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Semester
            </label>
            <select
              onChange={(e) => setSelectSemester(e.target.value)}
              value={selectSemester}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Pilih Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
            </select>
          </div>
          {/* Kolom Kanan (Full Deskripsi) */}
        </div>

        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tahun
        </label>
        <input
          defaultValue={year}
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
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
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zm7-3q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10"
              />
            </svg>

            <span>Simpan</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DataKurikulum;
