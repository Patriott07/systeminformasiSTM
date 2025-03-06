import { useEffect, useState } from "react";
import Side from "../components/Side";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { serverPort, headers } from "../utls/global_variable.js";

const DashboardHome = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectShowData, setSelectShowData] = useState("blog");
  const [editData, setEditData] = useState(null);

  const [isOpenSidebar, setOpenSideBar] = useState(false);

  const [histories, setHistories] = useState([]);
  const [countData, setCountData] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchHistory();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchHistory();
  }, [currentPagination]);

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    console.log({ e });
    fetchHistory(e.target[0].value);
  };

  const fetchHistory = async (SQ) => {
    try {
      let prop = {
        p: currentPagination - 1,
        s: SQ || "",
      };

      if (startDate && endDate) {
        prop.startDate = startDate;
        prop.endDate = endDate;
      }

      const params = new URLSearchParams(prop);

      const response = await fetch(
        `${serverPort}/history/get?${params.toString()}`,
        { headers }
      );

      const data = await response.json();

      console.log({ data });

      if (data.success) {
        setHistories(data.data);
        setPagination(data.pagination.totalPages);
        setCountData(data.pagination.totalItems);
      } else {
        console.error("Gagal mengambil data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex flex-grow ">
        {isOpenSidebar || window.innerWidth >= 1024 ? <Side /> : null}

        <div className="absolute top-[30px] right-[30px] z-10">
          <button
            onClick={() => {
              console.log({ isOpenSidebar });
              setOpenSideBar(isOpenSidebar ? false : true);
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
        <div className="relative pb-12 overflow-x-auto shadow-md sm:rounded-lg lg:w-9/12 m-0 md:m-10">
          <div className="absolute h-[30vh] bg-purple-500 w-full z-[-2] p-12">
            <div className=" lg:text-3xl text-xl text-white font-semibold">
              Ringkasan Histories
            </div>
            <p className=" text-white lg:text[16px] text-sm uppercase mt-2 font-semibold">
              Semua History Pengelolaan Dashboard terbaca disini
            </p>
          </div>
          <div className="flex lg:flex-row flex-col items-center md:justify-center bg-white lg:mt-[20vh] mt-[25vh] px-4 z-[5] lg:w-11/12 mx-auto rounded-t">
            {/* <select
                            onChange={(e) => setSelectShowData(e.target.value)}
                            id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option value="user">Users</option>
                            <option value="blog" selected>Blogs</option>
                            <option value="kegiatan">Kegiatans</option>
                            <option value="jurusan">Jurusans</option>
                            <option value="kurikulum">Kurikulums</option>
                            <option value="guru">Gurus</option>
                            <option value="tag">Tags</option>
                        </select> */}

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
            <div className="lg:ms-24 flex flex-col lg:flex-row items-center gap-4">
              <div className="">
                <label
                  htmlFor="start_date"
                  className="text-xs font-semibold text-gray-600"
                >
                  Mulai Tanggal :
                </label>

                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    datepicker
                    onChange={(e) => setStartDate(e.target.value)}
                    id="default-datepicker"
                    type="date"
                    class="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[200px] ps-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
              <div action="">
                <label
                  htmlFor="start_date"
                  className="text-xs font-semibold text-gray-600"
                >
                  Hingga tanggal :
                </label>

                <div class="relative max-w-sm">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    datepicker
                    onChange={(e) => setEndDate(e.target.value)}
                    id="default-datepicker"
                    type="date"
                    class="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[200px] ps-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto w-12/12 lg:m-auto">
            <table className="text-sm text-left m-0 rounded-none rtl:text-right text-gray-500 dark:text-gray-400 border-t w-11/12 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dilakukan oleh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Datetime
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aktivitas
                  </th>
                </tr>
              </thead>
              <tbody>
                {histories.length > 0
                  ? histories.map((val, _i) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4">{_i + 1}</td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {val.name}
                          </th>
                          <td className="px-6 py-4">
                            {val.date.split(".")[0].replace("T", " Time:")}
                          </td>

                          <td className="px-6 py-4">{val.aktivitas}</td>
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
    </div>
  );
};

export default DashboardHome;