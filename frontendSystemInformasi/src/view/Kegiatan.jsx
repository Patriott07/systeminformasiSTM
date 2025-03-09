import React from "react";
import Kegi1 from "../assets/Kegi1.jpg"
import Kegi2 from "../assets/Kegi2.jpg"
import Kegi3 from "../assets/Kegi3.jpg"
import Kegi4 from "../assets/Kegi4.jpg"
import Kegi5 from "../assets/Kegi5.jpg"
import Kegi6 from "../assets/Kegi6.jpg"
import Kegi7 from "../assets/Kegi7.jpg"
import Kegi8 from "../assets/Kegi8.jpg"
import Kegi9 from "../assets/Kegi9.jpg"
import Kegi10 from "../assets/Kegi10.jpg"
import Kegi11 from "../assets/Kegi11.jpg"
import Kegi12 from "../assets/Kegi12.jpg"
import Footer from "./Footer";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import SMK from "../assets/smkn1.jpg";
import AOS from "aos";

const Kegiatan = () =>{
    const [selectedImage, setSelectedImage] = useState(null);
    const [kegiatan, setKegiatan] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Tambahkan state untuk pagination jika diperlukan
    const [selectedCategory, setSelectedCategory] = useState("all"); // State untuk kategori
    const [filteredKegiatan, setFilteredKegiatan] = useState([]);
    
     const imageSizes = ["h-32", "h-40", "h-48", "h-56", "h-64"];

    useEffect(() => {
        AOS.init({ duration: 1500, once: false });
      }, []);

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
  
          // Acak urutan data sebelum menyimpannya ke state
          const shuffledData = data.data.sort(() => Math.random() - 0.5);
          setKegiatan(shuffledData || []);
        } catch (err) {
          setError("An error occurred. Please try again.");
        }
      };
  
      fetchKegiatan();
      
      const interval = setInterval(fetchKegiatan, 30000);
      return () => clearInterval(interval);
    }, []);
  
  
    useEffect(() => {
      setFilteredKegiatan(
        selectedCategory === "all"
          ? kegiatan
          : kegiatan.filter((item) => item.title === selectedCategory)
      );
    }, [selectedCategory, kegiatan]);
  
  

    return(
        <>
        
        <Navbar />
      {/* <section  style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1543505298-b8be9b52a21a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
      }} className="flex lg:min-h-screen h-[80vh] max-h-screen bg-cover w-full justify-center items-center">
          <div className="w-10/12 flex flex-col justify-center items-center min-h-screen">
          <h1 className="lg:text-5xl text-3xl lg:p-2 rounded-lg bg-blue-700/60 text-center text-white font-serif mb-4">Kegiatan SMKN I Kota Cirebon</h1>
          <p className="max-w-md p-1 lg:text-base text-sm rounded-lg bg-blue-700/60 text-center text-white">"Selamat Datang Di Page Kegiatan SMKN I KOTA CIREBON"</p>
          </div>
      </section> */}
        <section
              style={{
                // backgroundImage: `url('https://images.unsplash.com/photo-1611941671018-6c3907cb7a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww')`,
                backgroundImage: `url('${SMK}')`,
      
              }}
              className="w-full relative rounded-lg flex bg-cover  bg-fixed justify-center items-center min-h-[80vh] lg:min-h-screen bg-bottom"
            >
      
              {/* bg black */}
              <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full">
      
              </div>
      
              <div className="w-11/12  h-full flex translate-y-1/2  lg:translate-y-0 text-center flex-col justify-center items-center">
                <div className="w-full lg:min-h-[45vh] lg:max-h-[45vh] min-h-[5vh] max-h-[5vh] text-center flex flex-col justify-end items-center gap-4">
                  <h1 className="lg:text-5xl text-3xl font-serif font-medium text-blue-100">SELAMAT DATANG DI KEGIATAN </h1>
                  <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400"> SMKN 1 KOTA CIREBON</span>
                  <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">CIREBON</span>
                  <p className="lg:max-w-xl max-w-sm my-4 text-base lg:text-xl font-serif text-white">
                   Pantau Kegiatan Yang telah Berlangsung Di SMKN I Cirebon 
                  </p>
                  {/* <div className="flex gap-4 pb-8">
                    <button className="lg:px-4 px-2 py-2 text-sm lg:text-base lg:py-3 mt-2 bg-blue-400 rounded-lg">Example Button </button>
                    <button className="px-2 py-1 mt-2 bg-green-400 rounded-lg">Example Button </button>
                  </div> */}
                </div>
      
              </div>
            </section>

      <div className="flex justify-center  lg:min-h-screen bg-gray-100">
      <div className="w-10/12">
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

        <div className={selectedCategory === "all" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8" : "flex flex-col g items-center"}>
          {filteredKegiatan.length > 0 ? (
            filteredKegiatan.map((item) => (
              <div data-aos="fade-up" key={item._id} className="mb-6 text-center w-full">
                <h2 className="lg:text-xl text-sm font-bold mb-2">{item.title}</h2>
                <p className="text-gray-600 lg:text-base text-balance text-xs mb-4">{item.description}</p>
                <div className={selectedCategory === "all" ? "flex flex-col items-center gap-4" : "flex flex-wrap justify-center gap-4"}>
                  {item.details_media
                    .filter((media) => media.type === "img")
                    .map((media) => (
                      <div key={media._id}>
                        <img
                          className={selectedCategory === "all" ? "lg:min-h-60 lg:min-w-[22rem] lg:max-w-[22rem] min-h-[7rem] max-h-[7rem] min-w-[10rem] max-w-[10rem] object-cover rounded-lg cursor-pointer" : "lg:min-h-64 lg:min-w-64 min-w-[9rem] max-w-[9rem] max-h-[9rem] min-h-[9rem] object-cover rounded-lg cursor-pointer"}
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
 
    <Footer />

        </>
    )
}

export default Kegiatan;