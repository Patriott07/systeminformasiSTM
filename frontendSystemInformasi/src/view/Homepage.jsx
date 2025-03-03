import react from "react";
import Doc1 from "../assets/Doc1.png";
import Doc2 from "../assets/Dock.png";
import Poster from "../assets/poster.webp";
import SMKK from "../assets/smkk.jpg";
import SMKK1 from "../assets/smkk1.jpg";
import SMKK2 from "../assets/smkk2.jpg";
import { useState, useEffect } from "react";
import SMKK3 from "../assets/smkk3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Homepage = () => {
   const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      AOS.init({ duration: 1000, once: false });
    }, []);
   useEffect(() => {
      const fetchBlogs = async () => {
        const token = localStorage.getItem("token");
  
        try {
          const res = await fetch(`http://localhost:5050/blog/get`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: `${token}`,
            },
          });
  
          const data = await res.json();
          console.log({ data });
  
          if (!res.ok) {
            setError(data.message || "Failed to fetch blogs");
            return;
          }
  
          // Limit to 3 blogs
          const limitedBlogs = data.data.slice(0, 3); // Taking only the first 3 blogs
          setBlogs(limitedBlogs);
          setTotalPages(data.pagination.totalPages);
  
          // Ambil semua tag unik
          const tags = new Set();
          limitedBlogs.forEach((blog) => {
            blog.tags.forEach((tag) => tags.add(tag));
          });
          setAllTags([...tags]);
        } catch (err) {
          setError("An error occurred. Please try again.");
        }
      };
  
      fetchBlogs();
    }, []);
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
          <h1 className="lg:text-2xl text-sm font-bold">SMKN 1 CIREBON</h1>
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
              mencetak lulusan yang siap kerja, memiliki keterampilan di bidangnya, serta mampu bersaing <span className="text-blue-400"> di dunia industri</span>
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
          <div data-aos="fade-up" className="w-full flex items-start">
            <div className="flex gap-8">
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={SMKK1} alt="" />
              <div className="">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-serif font-medium">Apa Itu SMKN I KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  SMK Negeri 1 Kota Cirebon adalah salah satu Sekolah Menengah Kejuruan (SMK) unggulan di Kota Cirebon yang berlokasi di Jalan Perjuangan By Pass Sunyaragi, Cirebon, Jawa Barat. Sekolah ini berfokus pada pendidikan kejuruan
                  yang membekali siswa dengan keterampilan teknis dan profesional agar siap memasuki dunia kerja atau melanjutkan pendidikan ke jenjang yang lebih tinggi.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="w-full flex items-end justify-end mt-8">
            <div className="flex gap-8">
              <div className="flex flex-col items-end">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl text-justify font-serif font-medium">Kenapa harus SMKN I KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  SMKN 1 Cirebon bertujuan untuk mencetak lulusan yang siap kerja, memiliki keterampilan di bidangnya, serta mampu bersaing di dunia industri maupun melanjutkan pendidikan ke jenjang yang lebih tinggi. Sekolah ini juga
                  memiliki fasilitas laboratorium, bengkel praktik, serta kerja sama dengan berbagai industri untuk mendukung pembelajaran siswa.
                </p>
              </div>
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={SMKK2} alt="" />
            </div>
          </div>
          <div data-aos="fade-up" className="w-full flex items-start mt-8">
            <div className="flex gap-8">
              <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[15vh] bg-cover bg-center" src={SMKK3} alt="" />
              <div className="">
                <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-serif font-medium">Kepala sekolah SMKN I KOTA CIREBON KOTA CIREBON </h1>
                <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                  Kepala Sekolah SMK Negeri 1 Kota Cirebon saat ini adalah Arifuddin, S.Pd., M.T. Beliau bertanggung jawab dalam memimpin sekolah, mengembangkan kurikulum, serta memastikan bahwa seluruh program keahlian yang ditawarkan
                  dapat memberikan pendidikan terbaik bagi para siswa. Di bawah kepemimpinannya
                </p>
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
              <span className="min-w-[5rem]">Email : </span>
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
              style={{ border: "0" }}
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
          {blogs.map((blog) => (
          <div data-aos="fade-up" key={blog._id} className="max-w-xs min-w-[20rem] relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="min-h-[88%] max-h-[88%]">
          <a href={`/blog/${blog._id}`}>
             <img className="rounded-t-lg w-full h-32 lg:h-48 object-cover" src={blog.photo} alt={blog.title} />
           </a>
           <div className="lg:p-5 p-3">
             <Link to={`/blog/${blog._id}`}>
               <h5 className="mb-1 lg:text-lg text-xs font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
             </Link>
             <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">{blog.content}</p>
             <div className="flex flex-wrap gap-1 lg:gap-2 mb-2">
               {blog.tags.map((tag) => (
                 <span key={tag} className="px-2 py-1 text-[0.5rem] lg:text-xs bg-gray-200 text-gray-700 rounded-full mr-2">
                   {tag}
                 </span>
               ))}
             </div>
           </div>
          </div>
            <div className="ml-4 ">
            <Link to={`/blog/${blog._id}`} className="inline-flex   items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.5rem]  font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
               Read more
             </Link>
            </div>
         </div>
))}
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
