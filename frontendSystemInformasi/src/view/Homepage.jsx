import react from "react";
import Doc1 from "../assets/Doc1.png";
import Doc2 from "../assets/Dock.png";
import Poster from "../assets/poster.webp";
const Homepage = () => {
  return (
    <>
      {/* <section className="flex mx-4">
        <nav className="flex w-[1000vh] justify-between mt-2 lg:text-2xl font-serif ">
          <h1>Rs. Bahagia</h1>
          <div className="flex gap-2 ">
            <a href className="text-stone-700 duration-75 transition-colors cursor-cell hover:text-blue-500">
              Dokter
            </a>
            <a href className="text-stone-700 duration-75 transition-colors cursor-cell hover:text-blue-500">
              Poli
            </a>
            <a href className="text-stone-700 duration-75 transition-colors cursor-cell hover:text-blue-500">
              Login
            </a>
          </div>
        </nav>
      </section> */}
      <nav className="w-full bg-gray-900 text-white rounded-sm overflow-hidden lg:py-4 py-4 fixed top-0 z-50">
        <div className="lg:w-10/12 w-10/12 mx-auto flex justify-between items-center">
          <h1 className="lg:text-2xl text-sm font-bold">SMA BAKTI</h1>
          <div className="flex gap-4 lg:gap-8">
            <a href="/" className="hover:text-blue-400 lg:text-base text-xs">
              Home
            </a>
            <a href="blog" className="hover:text-blue-400 lg:text-base text-xs">
              Blog
            </a>
            <a href="/Kegiatan" className="hover:text-blue-400 lg:text-base text-xs">
              Kegiatan
            </a>
            <a href="/jurusan" className="hover:text-blue-400 lg:text-base text-xs">
              Jurusan
            </a>
          </div>
        </div>
      </nav>

      <section
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1611941671018-6c3907cb7a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww')`,
        }}
        className="w-full rounded-lg flex bg-cover justify-center items-center min-h-[80vh] lg:min-h-screen"
      >
        <div className="w-11/12  h-full flex translate-y-1/2  lg:translate-y-0 text-center flex-col justify-center items-center">
          <div className="w-full lg:min-h-[45vh] lg:max-h-[45vh] min-h-[5vh] max-h-[5vh]  text-center flex flex-col justify-end items-center">
            <h1 className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">SELAMAT DATANG DI </h1>
            <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">SMA BAKTI KOTA CIREBON</span>
            <p className="lg:max-w-xl max-w-sm mt-1 text-base lg:text-xl font-serif text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi autem alias, ut est <span className="text-blue-400"> dolorum fuga!</span>
            </p>
            <div className="flex gap-4 pb-8">
              <button className="lg:px-4 px-2 py-2 text-sm lg:text-base lg:py-3 mt-2 bg-blue-400 rounded-lg">Example Button </button>
              <button className="px-2 py-1 mt-2 bg-green-400 rounded-lg">Example Button </button>
            </div>
          </div>
          <div className="w-full flex gap-7 text-white justify-center items-end h-[12vh] lg:h-[15vh] mt-auto">
            <div className="flex flex-col">
              <span className="lg:text-xl text-sm">Ekstrakulikuler Siswa</span>
              <span className="lg:text-base text-xs">We Have 10+ Ekskul</span>
            </div>
            <div className="flex flex-col">
              <span className="lg:text-xl text-sm">Ekstrakulikuler Siswa</span>
              <span className="lg:text-base text-xs">We Have 10+ Ekskul</span>
            </div>
            <div className="flex flex-col">
              <span className="lg:text-xl text-sm">Ekstrakulikuler Siswa</span>
              <span className="lg:text-base text-xs">We Have 10+ Ekskul</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full justify-center flex mt-8">
        <div className="w-10/12 justify-center flex flex-col items-center">
          <div className="w-full flex items-start">
            <div className="flex gap-8">
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={Doc2} alt="" />
              <div className="">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-serif font-medium">Apa Itu SMA BAKTI KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, esse illum fuga quisquam qui natus ipsum officiis corporis officia laborum repellat, placeat maxime facilis dolores!
                </p>
                <button className="border-blue-500 lg:py-2 lg:px-4 lg:text-base text-sm py-1 px-2 rounded-xl border-2 mt-4">Read More</button>
              </div>
            </div>
          </div>

          <div className="w-full flex items-end justify-end mt-8">
            <div className="flex gap-8">
              <div className="flex flex-col items-end">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl text-justify font-serif font-medium">Kenapa harus SMA BAKTI KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, esse illum fuga quisquam qui natus ipsum officiis corporis officia laborum repellat, placeat maxime facilis dolores quisquam qui natus ipsum!
                </p>
                <button className="border-blue-500 lg:py-2 lg:px-4 lg:text-base text-sm py-1 px-2 rounded-xl border-2 mt-4">Read More</button>
              </div>
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={Doc1} alt="" />
            </div>
          </div>
          <div className="w-full flex items-start mt-8">
            <div className="flex gap-8">
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={Doc2} alt="" />
              <div className="">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-serif font-medium">Kepala sekolah SMA BAKTI KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, esse illum fuga quisquam qui natus ipsum officiis corporis officia laborum repellat, placeat maxime facilis dolores!
                </p>
                <button className="border-blue-500 lg:py-2 lg:px-4 lg:text-base text-sm py-1 px-2 rounded-xl border-2 mt-4">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[18rem]  flex justify-center ">
        <div className="w-10/12 lg:flex">
          <div className="lg:max-w-[50%] lg:min-w-[50%] w-full flex flex-col justify-center   min-h-full text-lg font-serif">
            <div className="gap-2 flex mb-2">
              <span className="min-w-[5rem]">Telp : </span>
              <h1> +62-0231-480202,</h1>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="min-w-[5rem]" >Email : </span>
              <h1>info@smkn1-cirebon.sch.id</h1>
            </div>
            <div className="flex gap-2 mb-2">
              <span className="min-w-[5rem]">Alamat :</span>
            <h1>Jalan Perjuangan, Kelurahan Sunyaragi, Kecamatan Kesambi, Kota Cirebon, Jawa Barat, </h1>

            </div>
          </div>
          <div className="lg:max-w-[50%] lg:min-w-[50%] w-full justify-center flex min-h-full">
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.578242155735!2d108.53415787362854!3d-6.735291293260876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1df0e55b2ed3%3A0x51cf481547b4b319!2sSMK%20Negeri%201%20Cirebon!5e1!3m2!1sid!2sid!4v1738761226845!5m2!1sid!2sid"
        width="80%"
        height="90%"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SMK Negeri 1 Cirebon Map"
      />
          </div>
        </div>
      </section>

      <section className="w-full justify-center flex mt-44 lg:mt-14">
        <div className="lg:w-10/12 w-full">
          <h1 className="text-center mb-4 text-blue-500 text-xl font-serif">Our Blog</h1>
          <div className="flex gap-4 lg:gap-8 justify-center flex-wrap">
            <div class="lg:max-w-[19rem] max-w-[11rem] bg-white border lg:max-h-[27.2rem] min-h-[17rem] max-h-[17rem] border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg w-full bg-cover lg:max-h-[35vh] lg:min-h-[35vh] min-h-[11vh] max-h-[11vh]" src={Poster} />
              </a>
              <div class="lg:p-5 p-2">
                <a href="#">
                  <h5 class="mb-1 text-[0.9rem] lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p class="mb-2 font-normal lg:text-base text-[0.7rem] text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a
                  href="#"
                  class="inline-flex items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.7rem] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          
            <div class="lg:max-w-[19rem] max-w-[11rem] bg-white border lg:max-h-[27.2rem] min-h-[17rem] max-h-[17rem] border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg w-full bg-cover lg:max-h-[35vh] lg:min-h-[35vh] min-h-[11vh] max-h-[11vh]" src={Poster} />
              </a>
              <div class="lg:p-5 p-2">
                <a href="#">
                  <h5 class="mb-1 text-[0.9rem] lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p class="mb-2 font-normal lg:text-base text-[0.7rem] text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a
                  href="#"
                  class="inline-flex items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.7rem] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          
            <div class="lg:max-w-[19rem] max-w-[11rem] bg-white border lg:max-h-[27.2rem] min-h-[17rem] max-h-[17rem] border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg w-full bg-cover lg:max-h-[35vh] lg:min-h-[35vh] min-h-[11vh] max-h-[11vh]" src={Poster} />
              </a>
              <div class="lg:p-5 p-2">
                <a href="#">
                  <h5 class="mb-1 text-[0.9rem] lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p class="mb-2 font-normal lg:text-base text-[0.7rem] text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a
                  href="#"
                  class="inline-flex items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.7rem] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          
            
          
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-900 text-white py-4 mt-3">
        <div className="w-10/12 mx-auto text-center">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold">SMA BAKTI KOTA CIREBON</h2>
              <p className="mt-2 text-gray-400">Providing quality healthcare since 1990</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-blue-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400">
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a8.38 8.38 0 0 1-2.4.66 4.2 4.2 0 0 0 1.84-2.32 8.4 8.4 0 0 1-2.66 1.02 4.18 4.18 0 0 0-7.12 3.82 11.86 11.86 0 0 1-8.6-4.36 4.18 4.18 0 0 0 1.29 5.57 4.15 4.15 0 0 1-1.89-.52v.05a4.18 4.18 0 0 0 3.35 4.1 4.2 4.2 0 0 1-1.88.07 4.18 4.18 0 0 0 3.9 2.9A8.38 8.38 0 0 1 2 19.54a11.82 11.82 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53a8.36 8.36 0 0 0 2.06-2.13z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.14 6.84 9.46.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.96 9.96 0 0 0 22 12c0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.14 6.84 9.46.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.96 9.96 0 0 0 22 12c0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-gray-400">© 2023 SMA BAKTI. All rights reserved.</p>
        </div>
      </footer>

       </>
  );
};

export default Homepage;
