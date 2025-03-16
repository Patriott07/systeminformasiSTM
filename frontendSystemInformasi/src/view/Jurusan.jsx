import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
<<<<<<< HEAD
import Footer from "../components/Footer";
import SMK from '../assets/smkn1.jpg';
=======
import SMK from '../assets/smkn1.jpg';
import Footer from '../components/Footer';

>>>>>>> 509c3aa294e2a03bf254c8d0f9d261dff425d7d4

const Jurusan = () => {
  const [jurusan, setJurusan] = useState(null);
  const [error, setError] = useState(null);
  const [jurusanList, setJurusanList] = useState([]);

  const [indexTarget, setIndexTarget] = useState(0);

  const startRandomImage = () => {
    console.log({ message: "ok", jurusanList })
    if (jurusanList.length > 0) {
      const randomNum = Math.floor(Math.random() * jurusanList.length);
      setIndexTarget(randomNum);
      console.log({ message: "ok", randomNum });
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      startRandomImage();
    }, 1000 * 10);

  
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
          setJurusanList(shuffleArray(data.data));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("An error occurred. Please try again.");
      }
    };

    fetchJurusan();
    const interval = setInterval(() => {
      setJurusanList((prev) => shuffleArray([...prev]));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (jurusanList.length === 0) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
       <Navbar size={'w-screen'}/>
      {jurusanList.length > 0 ? (

        <section
          style={{
            // backgroundImage: `url('https://images.unsplash.com/photo-1611941671018-6c3907cb7a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww')`,
            backgroundImage: `url('${jurusanList[indexTarget]['images'][0]}')`,

          }}
          className="w-full relative rounded-lg flex bg-cover  bg-fixed justify-center items-center min-h-[80vh] lg:min-h-screen bg-bottom"
        >

          {/* bg black */}
          <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full">

          </div>

          <div className="w-11/12  h-full flex translate-y-1/2  lg:translate-y-0 text-center flex-col justify-center items-center">
            <div className="w-full lg:min-h-[45vh] lg:max-h-[45vh] min-h-[5vh] max-h-[5vh] text-center flex flex-col justify-end items-center gap-4">
              <h1 className="lg:text-5xl text-3xl font-serif font-medium text-blue-100">SELAMAT DATANG DI </h1>
              <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">INFORMASI JURUSAN DI SMKN 1</span>
              <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">CIREBON</span>
              <p className="lg:max-w-xl max-w-sm my-4 text-base lg:text-xl font-serif text-white">
                Tersedia Hingga 10+ jurusan untuk mencetak lulusan yang siap kerja, memiliki keterampilan di bidangnya, serta mampu bersaing <span className="text-blue-400"> di dunia industri</span>
              </p>
              {/* <div className="flex gap-4 pb-8">
              <button className="lg:px-4 px-2 py-2 text-sm lg:text-base lg:py-3 mt-2 bg-blue-400 rounded-lg">Example Button </button>
              <button className="px-2 py-1 mt-2 bg-green-400 rounded-lg">Example Button </button>
            </div> */}
            </div>

          </div>
        </section>

      ) : null}

      <section className="w-full flex flex-col items-center justify-center">
        {jurusanList.map((jurusan) => (
          <div data-aos="fade-up" key={jurusan._id} className="w-10/12 flex flex-col lg:flex-row lg:h-[100vh] h-[100vh]  gap-6 mb-12">
            {/* Bagian Kiri: Deskripsi Jurusan & List Guru */}
            <div className="lg:w-1/2 w-full lg:min-h-screen pt-16 flex flex-col">
              <h1 className="lg:text-3xl text-xl font-serif">
                Jurusan <span className="text-orange-400">{jurusan.name}</span>
              </h1>
              <p className="lg:text-lg max-w-md text-justify mt-2 text-gray-700">{jurusan.deskripsi}</p>
              <button onClick={() => navigate(`/jurusan/${jurusan._id}`)} className="mt-4 flex gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 14H5v-2h6zm8-4H5v-2h14zm0-4H5V7h14z" /></svg>
                <span>
                  Lihat Detail
                </span>
              </button>
              {/* List Guru */}
              <div className="flex overflow-x-auto lg:min-h-[18rem] gap-4 min-h-[13rem] max-h-[20rem] mt-8 pb-4">
                {jurusan.teachers?.map((teacher) => (
                  <div key={teacher._id} className="lg:max-w-[13rem] lg:min-w-[13rem] items-start bg-gray-100 rounded-lg shadow-md">
                    <div className="w-full min-h-[8rem] max-h-[8rem] min-w-[8rem] max-w-[8rem] lg:min-h-[11rem] lg:max-h-[11rem] lg:min-w-[13rem] lg:max-w-[13rem] h-[65%]">
                      <img className="w-full h-full object-cover rounded-t-lg" src={teacher.photo} alt={teacher.name} />
                    </div>
                    <div className="mt-3 ml-2">
                      <h1 className="lg:text-lg text-sm font-semibold">{teacher.name}</h1>
                      <h1 className="lg:text-sm text-xs font-light text-gray-500 mb-2">{teacher.mengajar}</h1>
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

      <Footer />
    </>
  );
};

export default Jurusan;
