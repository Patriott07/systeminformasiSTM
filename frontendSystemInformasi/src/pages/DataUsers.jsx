import { useState, useEffect } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { serverPort, headers } from '../utls/global_variable.js';
import Swal from 'sweetalert2';

const DataUsers = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [users, setUser] = useState([]);


    const [countData, setCountData] = useState(0);
    const [pagination, setPagination] = useState(0);
    const [currentPagination, setCurrentPagination] = useState(1);

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        handlerFetchUser(e.target[0].value);
    }

    // FUngsi ketika ada perubahan pada currentPagination
    const handleChangePagination = (num) => {
        if (num > 0 && num < pagination + 1) {
            setCurrentPagination(num);
        }
    }

    useEffect(() => {
        handlerFetchUser();
    }, [currentPagination])

    useEffect(() => {
        handlerFetchUser();
    }, []);

    const handlerFetchUser = async (SQ) => {

        let url = `${serverPort}/user/get?p=${currentPagination - 1}`;

        if (SQ) {
            url += `&s=${SQ}`;
        }

        try {
            const res = await fetch(url, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            const data = await res.json();
            console.log({ data })

            setUser(data.data);
            setPagination(data.pagination.totalPages);
            setCountData(data.pagination.totalItems)

        } catch (error) {
            console.log({ message: "Something wrong while fetch users", error })
        }
    }

    const handleSubmitAdmin = async (id) => {
        try {
            const res = await fetch(`${serverPort}/user/assign`, {
                method: "POST",
                body: JSON.stringify({
                    id
                }),
                headers
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            Swal.fire("Successfully", data.message, "success")

        } catch (error) {
            console.log({ error })
            Swal.fire("Something wrong!", error.message, "error")
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
                    const res = await fetch(`${serverPort}/user/delete/${id}`, {
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


    const openEditModal = (data) => {
        setEditData(data);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditData(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow">
                <Side />

                <div className="relative pb-8 overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-10">
                    <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
                        <div className="font-semibold text-3xl text-white">
                            Data Users
                        </div>
                        <p className=" text-white uppercase mt-2 font-semibold">Mulai Kelola Users ({countData} items)</p>

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

                    </div>
                    <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    role
                                </th>

                                <th scope="col" className="px-9 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((val, _i) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">1</td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {val.name}
                                    </th>

                                    <td className="px-6 py-4">{val.email}</td>
                                    <td className="px-6 py-4">{val.role ?? 'user'}</td>
                                    <td className="px-6 py-4 flex flex-col gap-2">
                                        {val.role != "admin" ? (

                                            <button onClick={() => handleSubmitAdmin(val._id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                                            >
                                                <span>Assign to admin</span>
                                            </button>
                                        ) : null}
                                        <button onClick={() => handleDelete(val._id)}
                                            href="#"
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
                                        >
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            )) : null}
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

export default DataUsers;