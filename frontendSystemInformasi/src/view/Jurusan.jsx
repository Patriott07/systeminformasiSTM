import Kegi9 from "../assets/Kegi9.jpg";
import Kegi10 from "../assets/Kegi10.jpg";
import Kegi11 from "../assets/Kegi11.jpg";
import Kegi12 from "../assets/Kegi12.jpg";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";

const Jurusan = () => {
  const [jurusan, setJurusan] = useState(null);
  const [error, setError] = useState(null);
  const [jurusanList, setJurusanList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  useEffect(() => {
    const fetchJurusan = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5050/Jurusan/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data.data)) {
          setJurusanList(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("An error occurred. Please try again.");
      }
    };

    fetchJurusan();
  }, []);
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (jurusanList.length === 0) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
 
  return (
    <>
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

      <section className="lg:min-h-screen flex  justify-center">
        <div className="w-10/12  flex flex-col lg:flex-row  ljustify-center">
          <div className="lg:max-w-[50%] lg:min-w-[50%] w-full lg:min-h-screen lg:mt-0 mt-20  flex flex-col justify-center">
            <h1 className="max-w-md lg:text-3xl text-xl text-center lg:text-left font-serif">
              <span className="text-blue-500">Lorem ipsum dolor sit amet,</span> consectetur adipisicing elit. Qui aliquid corrupti laborum eaque earum maxime vero.
            </h1>
            <div className="mt-6">
              <p className="max-w-sm font-serif lg:text-left text-center lg:text-base text-sm"> "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quod, sequi quos sint consequuntur dicta."</p>
            </div>
          </div>
          <div className="lg:max-w-[50%] lg:min-w-[50%] w-full h-[30rem] lg:min-h-screen items-center  flex flex-col justify-center">
            <div className="flex gap-4">
              <div className="lg:w-[13rem] lg:h-[13rem] w-[8rem] h-[8rem]  rounded-br-3xl overflow-hidden  bg-black">
                <img className="bg-cover " src={Kegi10} alt="" />
              </div>
              <div className="lg:w-[13rem] lg:h-[13rem] w-[8rem] h-[8rem] rounded-bl-3xl overflow-hidden bg-black">
                <img className="bg-cover " src={Kegi11} alt="" />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="lg:w-[13rem] lg:h-[13rem] w-[8rem] h-[8rem]  rounded-tr-3xl overflow-hidden bg-black">
                <img className="bg-cover " src={Kegi12} alt="" />
              </div>
              <div className="lg:w-[13rem] lg:h-[13rem] w-[8rem] h-[8rem]   rounded-tl-3xl overflow-hidden bg-black">
                <img className="bg-cover " src={Kegi9} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center">
        {jurusanList.map((jurusan) => (
          <div data-aos="fade-up" key={jurusan._id} className="w-10/12 flex flex-col lg:flex-row lg:min-h-screen gap-6 mb-12">
            {/* Bagian Kiri: Deskripsi Jurusan & List Guru */}
            <div className="lg:w-1/2 w-full lg:min-h-screen pt-16 flex flex-col">
              <h1 className="lg:text-3xl text-xl font-serif">
                Jurusan <span className="text-orange-400">{jurusan.name}</span>
              </h1>
              <p className="lg:text-lg max-w-md text-justify mt-2 text-gray-700">{jurusan.deskripsi}</p>
              <button onClick={() => navigate(`/jurusan/${jurusan._id}`)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Lihat Detail
              </button>
              {/* List Guru */}
              <div className="flex overflow-x-auto lg:min-h-[19rem] gap-4 min-h-[13rem] max-h-[19rem] mt-8 pb-4">
                {jurusan.teachers?.map((teacher) => (
                  <div key={teacher._id} className="lg:max-w-[13rem] lg:min-w-[13rem] lg:min-h-[16rem] lg:max-h-[16rem] bg-gray-100 rounded-lg shadow-md">
                    <div className="w-full h-[65%]">
                      <img className="w-full h-full object-cover rounded-t-lg" src={teacher.photo} alt={teacher.name} />
                    </div>
                    <div className="mt-3 ml-2">
                      <h1 className="lg:text-xl text-sm font-semibold">{teacher.name}</h1>
                      <h1 className="lg:text-lg text-xs font-light text-gray-500">{teacher.mengajar}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian Kanan: Gambar Jurusan */}
            <div className="lg:w-1/2 w-full min-h-screen lg:pt-16 flex flex-col">
              <div className="flex  flex-col items-center h-full gap-2">
                {jurusan.images?.map((image, index) => (
                  <div key={index} className="lg:min-w-[20rem] lg:max-w-[20rem] lg:min-h-[15rem] lg:max-h-[15rem] w-full  min-h-[9rem] max-h-[9rem] bg-black mb-4 rounded-lg overflow-hidden">
                    <img src={image} className="w-full h-full object-cover" alt={`Jurusan ${jurusan.name}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Jurusan;
