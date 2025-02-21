import { useState, useEffect } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

import { headers, serverPort } from '../utls/global_variable.js';

import Swal from 'sweetalert2';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


const DataMapels = () => {

    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [countData, setCountData] = useState(0);
    const [pagination, setPagination] = useState(0);
    const [currentPagination, setCurrentPagination] = useState(1);

    const [images, setImages] = useState([]);
    const [mapels, setMapels] = useState([]);

    const { id, name } = useParams();

    const [curiculums, setCuriculums] = useState([]);


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
        handleFetchTeachers();

        const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
        });
        lightbox.init();

        // handleGetMapels();
        handleGetCuriculum();
    }, []);

    const handleFetchTeachers = async (SQ) => {
        let url = `${serverPort}/mapel/get/?p=${currentPagination - 1}`;

        if (SQ) {
            url += `&s=${SQ}`;
        }

        try {
            const res = await fetch(url, {
                headers
            })

            const data = await res.json();
            console.log({ data })

            if (data.data.length == 0) {
                return;
            }

            setMapels(data.data);
            setPagination(data.pagination.totalPages);
            setCountData(data.pagination.totalItems);

        } catch (error) {
            console.log({ message: "Something wrong while fetch Mapel", error })
        }
    }

    const handleGetCuriculum = async () => {
        try {
            const res = await fetch(`${serverPort}/curiculum/get`, { headers });
            const data = await res.json();
            console.log({ data })
            setCuriculums(data.data);

        } catch (error) {
            console.log({ error })
            Swal.fire('Something Wrong', error.message, 'error')
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
                    const res = await fetch(`${serverPort}/mapel/delete/${id}`, {
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

    const handleChangeSelect = async (e) => {
        try {
            let url = `${serverPort}/mapel/get/?p=${currentPagination - 1}&select=${e.target.value}`;

            const res = await fetch(url, {
                headers
            })

            const data = await res.json();
            console.log({ data })

            if (data.data.length == 0) {
                setMapels([]);
                setPagination(0);
                setCountData(0);
                return;
            }

            setMapels(data.data);
            setPagination(data.pagination.totalPages);
            setCountData(data.pagination.totalItems);
        } catch (error) {
            console.log({ error })
        }
    }


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow">
                <Side />

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-10 pb-8">
                    <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
                        <div className="font-semibold text-xl text-white">
                            Data Mapel {name}
                        </div>
                        <p className=" text-white uppercase mt-2 font-semibold text-sm">Mulai Kelola Mapel di SMKN 1 CIREBON ({countData} items)</p>

                    </div>
                    <div className="flex items-center justify-between bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">

                        <form class="max-w-sm my-3">

                            <select
                                onChange={handleChangeSelect}
                                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[300px]">
                                <option selected>Pilih Jurusan Dan Semester</option>
                                {curiculums.length > 0 ? curiculums.map((val, _i) => {
                                    return (
                                        <option value={val._id}>{val.nama_jurusan} || Kelas {val.kelas} || Semester {val.semester}</option>
                                    )
                                }) : null}
                            </select>
                        </form>

                        <Link
                            to={`/add_mapel`}
                            className="w-fit mt-3 mb-4 text-white bg-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
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
                                    Name Mapels
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jam Mengajar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jurusan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Semester
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Photo
                                </th> */}
                                <th scope="col" className="px-9 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody id="gallery">
                            {mapels.length > 0 ? mapels.map((val, _i) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{_i + 1}</td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                                        >
                                            {val.nama_mapel}
                                        </th>
                                        <td className="px-6 py-4">
                                            {val.jam_per_minggu} Jam
                                        </td>
                                        <td className="px-6 py-4">
                                            {val.curiculum.nama_jurusan}
                                        </td>
                                        <td>
                                            Semester {val.curiculum.semester}
                                        </td>

                                        <td className="px-6 py-4 flex flex-col gap-2">
                                            <button
                                                onClick={() =>
                                                    openEditModal({
                                                        ...val,
                                                        curiculums
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
    const { _id, nama_mapel, curiculum, jam_per_minggu, curiculums } = data;

    const [curiculumSelect, setCuriculumSelect] = useState(curiculum);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                nama_mapel: e.target[0].value,
                curiculum: e.target[1].value,
                jam_per_minggu: e.target[2].value,
            }

            const res = await fetch(`${serverPort}/mapel/update/${_id}`, {
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
                    Edit Data Mapel
                </h2>

                <label className="block text-sm text-gray-900 font-semibold">Nama Mapel</label>
                <input
                    type="text"
                    defaultValue={nama_mapel}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    placeholder="Masukkan Nama..."
                />

                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Semester Dan Jurusan</label>
                <select value={curiculumSelect} onChange={(e) => setCuriculumSelect(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
                    {/* <option selected>Choose Mapel</option> */}
                    {curiculums.length > 0 ? curiculums.map((val, _i) => {
                        return (
                            <option value={val._id}>{val.nama_jurusan} || Semester {val.semester} || Kelas {val.kelas}</option>
                        )
                    }) : null}
                </select>

                <label className="block text-sm text-gray-900 font-semibold">Jam per minggu</label>
                <input
                    type="number"
                    defaultValue={jam_per_minggu}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    placeholder=""
                />


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

export default DataMapels;