import { useState } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const DataJurusan = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-10">
          <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
            <div className="font-semibold text-3xl text-white">
              Data Jurusan
            </div>
            <p className=" text-white uppercase mt-2 font-semibold">Mulai Kelola Jurusan SMKN 1 Cirebon (15 items)</p>
          
          </div>
          <div className="flex items-center justify-between bg-white mt-[20vh] px-4 z-[5] w-11/12 mx-auto rounded-t">
            <div className="pb-4 bg-white dark:bg-gray-900 p-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <Link
              to="/add_blog"
              className="w-fit text-white bg-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Tambah Data
            </Link>
          </div>
          <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Contens
                </th>
                <th scope="col" className="px-6 py-3">
                  PhotoCover
                </th>
                <th scope="col" className="px-6 py-3">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-9 py-3">
                  Action
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
                  Juara 1 Lomba Membuat Website
                </th>
                <td className="px-6 py-4">
                <img
                    src="https://awsimages.detik.net.id/community/media/visual/2023/03/16/ilustrasi-bulan-ramadan_169.jpeg?w=600&q=90"
                    className="w-20 h-20 rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td>
                  <img
                    src="https://awsimages.detik.net.id/community/media/visual/2023/03/16/ilustrasi-bulan-ramadan_169.jpeg?w=600&q=90"
                    className="w-20 h-20 rounded-full object-cover"
                    alt=""
                  />
                </td>
                <td className="px-6 py-4">One 2 One</td>
                <td className="px-6 py-4">2024-08-21</td>
                <td className="px-6 py-4 flex flex-col gap-2">
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
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <nav
            aria-label="Page navigation example"
            className="ms-11 mt-4 flex items-between justify-between"
          >
            <ul className="inline-flex -space-x-px text-sm">
            
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
             
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

export default DataJurusan;