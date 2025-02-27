import { useState, useEffect } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

import { headers, serverPort } from '../utls/global_variable.js';

import Swal from 'sweetalert2';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


const DataTeachers = () => {



    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [countData, setCountData] = useState(0);
    const [pagination, setPagination] = useState(0);
    const [currentPagination, setCurrentPagination] = useState(1);

    const [images, setImages] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const { id, name } = useParams();

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
        handleFetchTeachers(e.target[0].value);
    }

    // FUngsi ketika ada perubahan pada currentPagination
    const handleChangePagination = (num) => {
        if (num > 0 && num < pagination + 1) {
            setCurrentPagination(num);
        }
    }

    useEffect(() => {
        handleFetchTeachers();
    }, [currentPagination])

    useEffect(() => {
        checkScreenWidth();
        handleFetchTeachers();

        const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
        });
        lightbox.init();

        // handleGetMapels();
    }, []);

    const handleFetchTeachers = async (SQ) => {
        let url = `${serverPort}/jurusan/guru/get/${id}/?p=${currentPagination - 1}`;

        if (SQ) {
            url += `&s=${SQ}`;
        }

        try {
            const res = await fetch(url, {
                headers
            })

            const data = await res.json();
            console.log({ data })

            setTeachers(data.data);
            setPagination(data.totalPages);
            setCountData(data.totalItems);

            if (data.data.length == 0) {
                return;
            }

            let image = [];

            data.data.forEach((val, _i) => {
                const img = document.createElement('img');
                img.src = val.photo;


                image.push({
                    src: val.photo,
                    w: img.naturalWidth,
                    h: img.naturalHeight
                });


            })

            setImages(image);
            console.log({ image })

        } catch (error) {
            console.log({ message: "Something wrong while fetch Jurusan", error })
        }
    }

    const handleDelete = async (_id) => {
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
                    const res = await fetch(`${serverPort}/jurusan/guru/delete/${id}/${_id}`, {
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

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-9/12 md:m-10 pb-8">
                    <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
                        <div className="font-semibold text-xl text-white">
                            Data Teachers Di Jurusan {name}
                        </div>
                        <p className=" text-white uppercase mt-2 font-semibold text-sm">Mulai Kelola Guru di Jurusan {name} ({countData} items)</p>

                    </div>
                    <div className="flex items-center justify-between bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">
                        <div className="py-4 bg-white dark:bg-gray-900 p-4">
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>

                        </div>
                        <Link
                            to={`/add_teacher/${id}`}
                            className="w-fit mt-3 mb-4 text-white bg-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                        >
                            Tambah Data
                        </Link>
                    </div>
                    <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name Teacher
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mengajar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Photo
                                </th>
                                <th scope="col" className="px-9 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody id="gallery">
                            {teachers.length > 0 ? teachers.map((val, _i) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{_i + 1}</td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                                        >
                                            {val.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {val.mengajar}
                                        </td>
                                        <td>
                                            {<a
                                                //  onClick={(e) => e.preventDefault()}
                                                href={images[_i]['src']} data-pswp-width={images[_i]['w']} data-pswp-height={images[_i]['h']}>

                                                <img src={val.photo} alt={`Thumbnail ${_i}`} width="100" style={{ cursor: "pointer" }} />
                                            </a>
                                            }
                                        </td>

                                        <td className="px-6 py-4 flex flex-col gap-2">
                                            <button
                                                onClick={() =>
                                                    openEditModal({
                                                        ...val,
                                                        photo: images[_i]
                                                    })
                                                }
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg>
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
    const { _id, name, mengajar, photo } = data;
    const { id } = useParams();
    // const [_id, setId] = useState(data._id);
    // const [name, setName] = useState(data.name);
    // const [deskripsi, setDeskripsi] = useState(data.deskripsi);
    // const [images, setDetailImages] = useState(data.images);
    const [mapels, setMapels] = useState([]);
    const [mapelGuru, setMapelGuru] = useState(mengajar);
    const [toggleMedia, setToggleMedia] = useState(true);

    useEffect(() => {
        handleGetMapels();
    }, [])

    const handleGetMapels = async () => {
        try {
            const res = await fetch(`${serverPort}/mapel/get`, { headers });
            const data = await res.json();
            setMapels(data.data);

        } catch (error) {
            console.log({ error })
            Swal.fire('Something Wrong', error.message, 'error')
        }
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                name: e.target[0].value,
                mengajar: e.target[1].value,
            }

            if (e.target[2].files.length > 0) {
                let imgUrl = null;
                let files = Array.from(e.target[2].files);

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

                            imgUrl = dataFile.url;
                            console.log({ dataFile })

                        } catch (error) {
                            console.log({ error })
                        }
                    })
                )

                body.photo = imgUrl;
            }

            const res = await fetch(`${serverPort}/jurusan/guru/update/${id}/${_id}`, {
                method: "POST",
                body: JSON.stringify(body),
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
                    Edit Data Guru
                </h2>

                <label className="block text-sm font-medium text-gray-700">Nama Guru</label>
                <input
                    type="text"
                    defaultValue={name}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    placeholder="Masukkan Nama..."
                />

                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Mengajar mapel</label>
                <select value={mapelGuru} onChange={(e) => setMapelGuru(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
                    {/* <option selected>Choose Mapel</option> */}
                    {mapels.length > 0 ? mapels.map((val, _i) => {
                        return (
                            <option value={val.nama_mapel}>{val.nama_mapel}</option>
                        )
                    }) : null}
                </select>

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

                        type="file"
                        onChange={() => setToggleMedia(false)}
                        className="w-full ps-3 h-[40px] border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:hover:bg-blue-600"
                    />
                </div>
                {toggleMedia ? (
                    <div className="overflow-x">

                        <div id="gallery" className="flex items-center gap-3">
                            {/*  */}

                            <a
                                //  onClick={(e) => e.preventDefault()}
                                href={photo.src} data-pswp-width={photo.w} data-pswp-height={photo.h}>

                                <img src={photo.src} width={photo.w} height={photo.h} style={{ cursor: "pointer" }} />
                            </a>
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

export default DataTeachers;