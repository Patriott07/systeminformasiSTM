import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const Kegiatan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [kegiatan, setKegiatan] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Tambahkan state untuk pagination jika diperlukan
  const [selectedCategory, setSelectedCategory] = useState("all"); // State untuk kategori
  const [filteredKegiatan, setFilteredKegiatan] = useState([]);

  const [indexTarget, setIndexTarget] = useState(0);
  const imageSizes = ["h-32", "h-40", "h-48", "h-56", "h-64"];

  const startRandomImage = () => {
    console.log({ message: "ok", kegiatan })
    if (kegiatan.length != 0) {
      const randomNum = Math.floor(Math.random() * kegiatan.length);
      setIndexTarget(randomNum);
      console.log({ message: "ok", randomNum });
    }
  }

  useEffect(() => {
    const fetchKegiatan = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5050/aktivitas/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch activities");
          return;
        }

        setKegiatan(data.data || []);
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchKegiatan();

    // Membuat interval yang berjalan setiap 5 detik (5000 ms)
    const interval = setInterval(() => {
      startRandomImage();
    }, 1000 * 10);


  }, []);

  useEffect(() => {
    setFilteredKegiatan(
      selectedCategory === "all"
        ? kegiatan
        : kegiatan.filter((item) => item.title === selectedCategory)
    );
  }, [selectedCategory, kegiatan]);


  return (
    <>
      <Navbar />
      {filteredKegiatan.length > 0 ? (
        <section style={{
          // backgroundImage: `url('https://images.unsplash.com/photo-1543505298-b8be9b52a21a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          backgroundImage: `url('${filteredKegiatan[indexTarget]['details_media'][0]['content']}')`
        }} className="flex bg-right bg-fixed relative lg:min-h-screen h-[80vh] max-h-screen bg-cover w-full justify-center items-center">

          {/* bg black */}
          <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full">

          </div>


          <div className="w-10/12 flex flex-col justify-center items-center min-h-screen z-10">
            <h1 className="lg:text-5xl text-3xl lg:p-2 rounded-lg text-center text-white font-serif mb-4 w-10/12">SELAMAT DATANG DI KEGIATAN</h1>
            <h1 className="lg:text-5xl text-3xl lg:p-2 rounded-lg text-center text-blue-400 font-serif mb-4 w-10/12"> SMKN 1 KOTA CIREBON</h1>
            <p className="lg:text-xl text-xl lg:p-2 rounded-lg  text-center text-white font-serif mb-4 max-w-md p-1">Pantau Kegiatan Yang Telah Berlangsung Di SMKN 1 Cirebon</p>
          </div>
        </section>
      ) : null}

      <div className="flex justify-center  lg:min-h-screen bg-gray-100">
        <div className="sm:w-10/12 w-10/12">
          <div className="lg:justify-between justify-between gap-2 py-4 flex">
            <h1 className="lg:text-2xl text-sm font-serif text-blue-500">
              {selectedCategory === "all" ? "Semua Kegiatan" : selectedCategory}
            </h1>
            <div>
              <h1 className="text-blue-500 lg:text-2xl text-sm font-serif mb-2">Daftar Kegiatan:</h1>
              <select
                className="border border-gray-300 lg:text-base text-xs rounded-lg lg:p-2 p-1 lg:min-w-full min-w-[3rem] max-w-[10rem]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All</option>
                {kegiatan.map((item) => (
                  <option key={item._id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={selectedCategory === "all" ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8" : "flex flex-col g items-center"}>
            {filteredKegiatan.length > 0 ? (
              filteredKegiatan.map((item) => (
                <div key={item._id} className="mb-6 text-start w-full">
                  <h2 className="lg:text-xl text-sm text-start font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-600 lg:text-base text-xs mb-4">{item.description}</p>
                  <div className={selectedCategory === "all" ? "flex flex-col items-center gap-4" : "flex flex-wrap justify-center gap-4"}>
                    {item.details_media
                      .filter((media) => media.type === "img")
                      .map((media) => (
                        <div key={media._id} className="w-full">
                          <img
                            className={selectedCategory === "all" ? "lg:min-h-60 lg:min-w-[22rem] lg:max-w-[22rem]  object-cover rounded-lg cursor-pointer" : "lg:min-h-64 lg:min-w-64 min-w-[9rem] max-w-[9rem] max-h-[9rem] min-h-[9rem] object-cover rounded-lg cursor-pointer"}
                            src={media.content}
                            alt={item.title || "Gambar Kegiatan"}
                            onClick={() => setSelectedImage(media.content)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada kegiatan yang tersedia</p>
            )}
          </div>
        </div>


        {selectedImage && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="relative">
              <button
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <img className="max-w-full max-h-screen rounded-lg" src={selectedImage} alt="Preview" />
            </div>
          </div>
        )}
      </div>

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
  )
}

export default Kegiatan;