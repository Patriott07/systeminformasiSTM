import Side from "../components/Side";
import { useState, useEffect } from "react";
import { headers, serverPort } from '../utls/global_variable.js'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from "react-router-dom";



const AddTeachers = () => {

    const navigate = useNavigate();
    const [mapels, setMapels] = useState([]);

    const {id} = useParams();

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
    useEffect(() => {
        handleGetMapels();
    }, [])
    const handleSubmitKegiatan = async (e) => {

        e.preventDefault();
        try {
            const file = e.target[2].files[0];
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


            const res = await fetch(`${serverPort}/jurusan/guru/create/${id}`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        name: e.target[0].value,
                        mengajar: e.target[1].value,
                        photo: dataFile.url,
                    }),
                }
            );

            const data = await res.json();
            console.log({ data });

            Swal.fire("Succesfully", data.message, 'success').then(() => navigate('/data_jurusan'))

        } catch (error) {
            console.log({ error });
            Swal.fire('Something Wrong', error.message, 'error');
        }
    }

    return (
        <div className="flex justify-between">
            <Side />
            <div
                class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"

            >
                <div class="flex h-full grow flex-col bg-white">
                    <div class="lg:px-40 px-4 flex flex-1 justify-start py-5">
                        <form onSubmit={handleSubmitKegiatan} class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5  flex-1">
                            <div class="flex max-w-[480px] flex-wrap items-end gap-4 text-2xl font-semibold py-3">
                                Tambah Guru Baru
                            </div>
                            <div>
                                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Nama Guru</label>
                                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama guru" required />
                            </div>
                            <div>
                                <label for="countries" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Mengajar mapel</label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
                                    <option selected>Choose Mapel</option>
                                    {mapels.length > 0 ? mapels.map((val, _i) => {
                                        return (
                                            <option value={val.nama_mapel}>{val.nama_mapel}</option>
                                        )
                                    }) : null}
                                </select>
                            </div>

                            <div>
                                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Photo Pengajar </label>
                                <input type="file" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                            </div>

                            <div class="flex py-3 gap-2">

                                <button type="submit" class="w-fit cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-8  bg-[#1980e6] text-white text-sm  leading-normal tracking-[0.015em]">
                                    <span class="truncate">Save Guru Baru</span>
                                </button>
                                <Link to={'/data_jurusan'} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeachers;
