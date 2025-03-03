import Side from "../components/Side";
import { useState, useEffect } from "react";
import { headers, serverPort } from '../utls/global_variable.js'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from "react-router-dom";



const AddMapels = () => {

    const navigate = useNavigate();
    const [curiculums, setCuriculums] = useState([]);

    const { id } = useParams();

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
    useEffect(() => {
        checkScreenWidth();
        handleGetCuriculum();
    }, [])

    const handleSubmitKegiatan = async (e) => {

        e.preventDefault();

        try {
            const res = await fetch(`${serverPort}/mapel/create`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        nama_mapel: e.target[0].value,
                        curiculum: e.target[1].value,
                        jam_per_minggu: e.target[2].value
                    }),
                }
            );

            const data = await res.json();
            console.log({ data });

            Swal.fire("Succesfully", data.message, 'success').then(() => navigate('/data_mapels'))

        } catch (error) {
            console.log({ error });
            Swal.fire('Something Wrong', error.message, 'error');
        }
    }

    return (
        <div className="flex justify-between">

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

            <div
                class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"

            >
                <div class="flex h-full grow flex-col bg-white">
                    <div class="lg:px-40 px-4 flex flex-1 justify-start py-5">
                        <form onSubmit={handleSubmitKegiatan} class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5  flex-1">
                            <div class="flex max-w-[480px] flex-wrap items-end gap-4 text-2xl font-semibold py-3">
                                Tambah Mapel Baru
                            </div>
                            <div>
                                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Nama Mapel</label>
                                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama mapel.." required />
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Kurikulum dan Semester</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
                                    <option selected>Pilih Semester dan Jurusan</option>
                                    {curiculums.length > 0 ? curiculums.map((val, _i) => {
                                        return (
                                            <option value={val._id}>{val.nama_jurusan} || Kelas {val.kelas} || Semester {val.semester} || Tahun {val.year}</option>
                                        )
                                    }) : null}
                                </select>
                            </div>

                            <div>
                                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Jam Per Minggu</label>
                                <input type="number" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jam Per Minggu.." required />
                            </div>

                            <div class="flex py-3 gap-2">

                                <button type="submit" class="w-fit cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4  bg-[#1980e6] text-white text-sm  leading-normal tracking-[0.015em]">
                                    <span class="truncate">Save Informasi Mapel</span>
                                </button>
                                <Link to={'/data_mapels'} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMapels;
