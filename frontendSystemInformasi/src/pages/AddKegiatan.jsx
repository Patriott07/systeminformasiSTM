import Side from "../components/Side";
import { useState, useEffect } from "react";
import { headers, serverPort } from '../utls/global_variable.js'
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";



const AddKegiatan = () => {

  const navigate = useNavigate();
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
  }, [])

  const handleSubmitKegiatan = async (e) => {

    e.preventDefault();
    let gallery = [];

    try {
      const files = Array.from(e.target[3].files);
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

      const res = await fetch(`${serverPort}/aktivitas/create`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: e.target[0].value,
            date: e.target[1].value,
            description: e.target[2].value,
            details_media: gallery
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
            <form onSubmit={handleSubmitKegiatan} class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5  flex-1">
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 text-2xl font-semibold py-3">
                Posting Kegiatan Baru
              </div>
              <div>
                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Title</label>
                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul kegiatan" required />
              </div>
              <div>
                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Date</label>
                <input type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>

                <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white ">description</label>
                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsi tentang kegiatan ini..."></textarea>

              </div>

              <div>
                <label for="first_name" class="block mb-2  text-gray-900 dark:text-white text-sm">Gallery </label>
                <input type="file" multiple id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <div className="text-sm text-gray-400 pb-5">(*you can choose multiple photo)</div>
              </div>

              <div class="flex py-3 gap-2">

                <button type="submit" class="w-fit cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-8  bg-[#1980e6] text-white text-sm  leading-normal tracking-[0.015em]">
                  <span class="truncate">Save Kegiatan Baru</span>
                </button>
                <Link to={'/data_kegiatan'} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKegiatan;
