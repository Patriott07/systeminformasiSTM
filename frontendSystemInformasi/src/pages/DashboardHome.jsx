import { useState } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const DashboardHome = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectShowData, setSelectShowData] = useState('blog');
    const [editData, setEditData] = useState(null);

    const openEditModal = (data) => {
        setEditData(data);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditData(null);
    };

    const TextChange = ({ type }) => {
        if (type == "blog") return "Blogs";
        if (type == "user") return "Users";
        if (type == "kegiatan") return "Kegiatans";
        if (type == "jurusan") return "Jurusans";
        if (type == "kurikulum") return "Kurikulums";
        if (type == "guru") return "Teachers";
        if (type == "tag") return "Tags";
    }


    return (
        <div className="flex flex-col min-h-screen ">
            <div className="flex flex-grow ">
                <Side />

                <div className="relative pb-12 overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-10">
                    <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
                        <div className=" text-3xl font-medium text-white">
                            Ringkasan Data
                        </div>
                        <p className=" text-white uppercase mt-2 font-semibold">Data Blog Terbaru</p>
                    </div>
                    <div className="flex items-center justify-between py-3 bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">
                        <select
                            onChange={(e) => setSelectShowData(e.target.value)}
                            id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option value="user">Users</option>
                            <option value="blog" selected>Blogs</option>
                            <option value="kegiatan">Kegiatans</option>
                            <option value="jurusan">Jurusans</option>
                            <option value="kurikulum">Kurikulums</option>
                            <option value="guru">Gurus</option>
                            <option value="tag">Tags</option>
                        </select>
                  
                        <Link
                            to="/add_kegiatan"
                            className="w-fit text-white bg-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Mulai Kelola <TextChange type={selectShowData} />
                        </Link>
                    </div>
                    <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Deskripsi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DetailMedia
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">1</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    Smartren Ramadhan
                                </th>
                                <td className="px-6 py-4">
                                    Kegiatan Memperkuat Agama dan Menambah Pahala Bagi Para Siswa
                                </td>
                                <td>
                                    <img
                                        src="https://awsimages.detik.net.id/community/media/visual/2023/03/16/ilustrasi-bulan-ramadan_169.jpeg?w=600&q=90"
                                        className="w-20 h-20 rounded-full object-cover"
                                        alt=""
                                    />
                                </td>
                                <td className="px-6 py-4">2024-08-21</td>
                                {/* <td className="px-6 py-4">
                                    <button
                                        onClick={() =>
                                            openEditModal({
                                                name: "Apple MacBook Pro 17",
                                                color: "Silver",
                                                category: "Laptop",
                                                price: "$2999",
                                            })
                                        }
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95 shadow-md flex items-center justify-center space-x-2"
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
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                    <a
                                        href="#"
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
                                    </a>
                                </td> */}
                            </tr>

                        </tbody>
                    </table>


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
    const [nama, setNama] = useState(data.nama);
    const [deskripsi, setDeskripsi] = useState(data.deskripsi);
    const [detail_media, setDetailMedia] = useState(data.detail_media);
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
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    placeholder="Masukkan Nama..."
                />

                {/* Grid Layout */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Kolom Kiri */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Detail Media
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setDetailMedia(e.target.files[0])}
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
                <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    placeholder="Tambahkan deskripsi..."
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

export default DashboardHome;