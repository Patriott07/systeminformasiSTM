import { useState, useEffect } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { headers, serverPort } from '../utls/global_variable.js';

import Swal from 'sweetalert2';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


const DataKegiatan = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [countData, setCountData] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);

  const [images, setImages] = useState([]);
  const [activity, setActivity] = useState([]);

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
    handleFetchKegiatan(e.target[0].value);
  }

  // FUngsi ketika ada perubahan pada currentPagination
  const handleChangePagination = (num) => {
    if (num > 0 && num < pagination + 1) {
      setCurrentPagination(num);
    }
  }

  useEffect(() => {
    handleFetchKegiatan();
  }, [currentPagination])

  useEffect(() => {
    handleFetchKegiatan();

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  }, []);

  const handleFetchKegiatan = async (SQ) => {
    let url = `${serverPort}/aktivitas/get?p=${currentPagination - 1}`;

    if (SQ) {
      url += `&s=${SQ}`;
    }

    try {
      const res = await fetch(url, {
        headers
      })

      const data = await res.json();
      console.log({ data })

      setActivity(data.data);
      setPagination(data.pagination.totalPages);
      setCountData(data.pagination.totalItems);

      let image = [];
      data.data.forEach((val, _i) => {

        let imgs = [];

        val.details_media.forEach((val2, _i2) => {
          let img = document.createElement('img');
          img.src = val2.content;


          imgs.push({
            src: val2.content,
            w: img.naturalWidth,
            h: img.naturalHeight
          })

        })

        image.push(imgs);
      })

      setImages(image);
      console.log({ image })

    } catch (error) {
      console.log({ message: "Something wrong while fetch users", error })
    }
  }


  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Data yang dihapus tidak dapat dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {

        if (result.isConfirmed) {
          const res = await fetch(`${serverPort}/aktivitas/delete/${id}`, {
            method: "DELETE",
            headers
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          Swal.fire("Successfully", data.message, "success").then(() => {
            window.location.reload();

          })
        }
      });

    } catch (error) {

      console.log({ error })
      Swal.fire("Something wrong!", error.message, "error")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Side />

        <div className="relative pb-8 overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-12">
          <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
            <div className="font-semibold text-3xl text-white">
              Data Kegiatan
            </div>
            <p className=" text-white uppercase mt-2 font-semibold">Mulai Kelola Kegiatan ({countData} items)</p>
          </div>
          <div className="flex items-center justify-between bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">
            <div className="pb-4 bg-white dark:bg-gray-900 p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">

                </div>
                <form onSubmit={handleSubmitSearch} className="flex items-start">

                  <input
                    type="text"
                    id="table-search"
                    className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />

                  <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </form>


              </div>
            </div>
            <Link
              to="/add_kegiatan"
              className="w-fit text-white bg-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Tambah Data
            </Link>
          </div>
          <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Gallery
                </th>
                <th scope="col" className="px-9 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm" id="gallery">
              {activity.length > 0 ? activity.map((val, _i) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{_i + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {val.title}
                    </th>
                    <td className="px-6 py-4">
                      {val.description}
                    </td>
                    <td>
                      {val.date}
                    </td>
                    <td className="px-6 py-4">
                      {<a
                        //  onClick={(e) => e.preventDefault()}
                        href={val.details_media[0]['content']} data-pswp-width={images[_i][0]['w']} data-pswp-height={images[_i][0]['h']}>

                        <img src={val.details_media[0]['content']} alt={`Thumbnail ${_i}`} width="100" style={{ cursor: "pointer" }} />
                      </a>
                      }

                      {Array.from({ length: val.details_media.length }).map((val2, __i) => {

                        return (
                          <a
                            //  onClick={(e) => e.preventDefault()}
                            href={images[_i][__i]['src']} data-pswp-width={images[_i][__i]['w']} data-pswp-height={images[_i][__i]['h']}>
                          </a>
                        )

                      })}


                    </td>
                    <td className="px-6 py-4 flex flex-col gap-2">
                      <button
                        onClick={() =>
                          openEditModal({ ...val, details_media: images[_i] })
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(val._id)}

                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
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
                )
              }) : null}
            </tbody>
          </table>

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
                  )
                } else {
                  return (
                    <div onClick={() => { handleChangePagination(i + 1); }} className="py-3 px-4 rounded-[5px] bg-[#272727] dark:bg-[#073B4C] text-white cursor-pointer">
                      {i + 1}
                    </div>

                  )
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
  const [_id, setId] = useState(data._id);
  const [title, setTitle] = useState(data.title);
  const [deskripsi, setDeskripsi] = useState(data.description);
  const [date, setDate] = useState(data.date);
  const [detail_media, setDetailMedia] = useState(data.details_media);

  const [newFiles, setNewFiles] = useState(null);

  const [toggleMedia, setToggleMedia] = useState(true);

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let body = {
        title: e.target[0].value,
        date: e.target[1].value,
        description: e.target[2].value,
      }

      if (e.target[3].files.length > 0) {
        let gallery = [];
        let files = Array.from(e.target[3].files);

        await Promise.all(
          files.map(async (file) => {
            try {
              let formData = new FormData();
              formData.append('file', file);
              formData.append('type', "image");

              const resfile = await fetch(`${serverPort}/file/save`, {
                method: "POST",
                body: formData,
                headers: {
                  token: localStorage.getItem('token')
                }
              });

              const dataFile = await resfile.json();

              gallery.push({
                type: "img",
                content: dataFile.url
              });

              console.log({ dataFile })

            } catch (error) {
              console.log({ error })
            }
          })
        )

        body.details_media = gallery;
      }

      console.log({body})
      const res = await fetch(`${serverPort}/aktivitas/update/${_id}`, {
        method: "POST",
        body : JSON.stringify(body),
        headers
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      Swal.fire("Succesfully", data.message, 'success').then(() => window.location.reload())

    } catch (error) {
      console.log({ error });
      Swal.fire("Something Wrong", error.message, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmitEdit} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[650px] animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
          Edit Data Kegiatan
        </h2>

        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          defaultValue={title}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          placeholder="Masukkan Nama..."
        />

        {/* Grid Layout */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            defaultValue={date.split('T')[0]}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          defaultValue={deskripsi}
          className="w-full h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
          placeholder="Tambahkan deskripsi..."
        />

        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Detail Media
            </label>

            <label onClick={() => setToggleMedia(!toggleMedia)} className="block text-sm text-blue-600 cursor-pointer font-semibold">
              {toggleMedia ? 'Hide' : 'Show'} Photos
            </label>

          </div>
          <input
            multiple
            type="file"
            onChange={() => setToggleMedia(false)}
            className="w-full ps-3 h-[40px] border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:hover:bg-blue-600"
          />
        </div>
        {toggleMedia ? (
          <div className="overflow-x">

            <div id="gallery" className="flex items-center gap-3">
              {detail_media.length > 0 ? detail_media.map((val, _i) => {
                console.log({ val })
                return (

                  <a
                    //  onClick={(e) => e.preventDefault()}
                    href={val.src} data-pswp-width={val.w} data-pswp-height={val.h}>

                    <img src={val.src} width={val.w} height={val.h} style={{ cursor: "pointer" }} />
                  </a>

                )
              }) : null}
            </div>

          </div>
        ) : null}

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zm7-3q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10" /></svg>
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DataKegiatan;