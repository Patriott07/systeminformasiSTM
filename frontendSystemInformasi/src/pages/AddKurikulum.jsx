import Side from "../components/Side";
import { useState, useEffect } from "react";
import { headers, serverPort } from '../utls/global_variable.js'
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";



const AddKurikulum = () => {

    const [jurusans, setJurusans] = useState([]);
    const navigate = useNavigate();
    const [namaJurusan, setNamaJurusan] = useState(null);

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

    useEffect(() => {
        checkScreenWidth();
        handleGetJurusan();
    }, [])

    const handleGetJurusan = async () => {
        let url = `${serverPort}/jurusan/get`;

        try {
            const res = await fetch(url, {
                headers
            })

            const data = await res.json();
            console.log({ data })

            setJurusans(data.data);

        } catch (error) {
            console.log({ message: "Something wrong while fetch Jurusan", error })
        }
    }

    const handleSubmitKurikulum = async (e) => {
        e.preventDefault();
        try {

            const res = await fetch(`${serverPort}/curiculum/create`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        nama_jurusan: namaJurusan,
                        jurusan: e.target[0].value,
                        kelas: e.target[1].value,
                        semester: e.target[2].value,
                        year: e.target[3].value,

                    }),
                }
            );

            const data = await res.json();
            console.log({ data });

            Swal.fire("Succesfully", data.message, 'success').then(() => navigate('/data_kegiatan'))

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
                        <form onSubmit={handleSubmitKurikulum} class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5  flex-1">
                            <div class="flex max-w-[480px] flex-wrap items-end gap-4 text-2xl font-semibold py-3">
                                Tambahkan Kurikulum Baru
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Jurusan</label>
                                <select id="" onChange={(e) => setNamaJurusan(e.target.selectedOptions[0].id)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Pilih Jurusan</option>
                                    {jurusans.length > 0 ? jurusans.map((val, _i) => {
                                        return (
                                            <option id={val.name} value={val._id}>{val.name}</option>
                                        )
                                    }) : null}

                                </select>
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Kelas</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Pilih Kelas</option>
                                    <option value="10">Kelas Sepuluh (10)</option>
                                    <option value="11">Kelas Sebelas (11)</option>
                                    <option value="12">Kelas Dua Belas (12)</option>
                                </select>
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Semester</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Pilih Semester</option>

                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                    <option value="3">Semester 3</option>
                                    <option value="4">Semester 4</option>
                                    <option value="5">Semester 5</option>
                                    <option value="6">Semester 6</option>

                                </select>
                            </div>

                            <div>
                                <label for="first_name" class="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Tahun Semester</label>
                                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2025.." required />
                            </div>

                            <div class="flex py-3 gap-2">

                                <button type="submit" class="w-fit cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-8  bg-[#1980e6] text-white text-sm  leading-normal tracking-[0.015em]">
                                    <span class="truncate">Save Kurikulum Baru</span>
                                </button>
                                <Link to={'/data_kurikulum'} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddKurikulum;
