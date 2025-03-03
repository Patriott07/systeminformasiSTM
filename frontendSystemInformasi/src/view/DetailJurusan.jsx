import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailJurusan = () => {
  const { id } = useParams(); // Ambil id dari parameter URL
  const [jurusan, setJurusan] = useState(null);
  const [error, setError] = useState(null);
  const [curiculum, setCuriculum] = useState(null);

  useEffect(() => {
    const fetchJurusanDetail = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const res = await fetch(`http://localhost:5050/Jurusan/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        });
  
        console.log("Response Status:", res.status); // Cek status response
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        console.log("Fetched Detail Data:", data); // Debug hasil fetch
  
        setJurusan(data.jurusan);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("An error occurred. Please try again.");
      }
    };
  
    fetchJurusanDetail();
  }, [id]);

  //   if (error) {
  //     return <p className="text-red-500 text-center">{error}</p>;
  //   }

  //   if (!jurusan) {
  //     return <p className="text-center text-gray-500">Loading...</p>;
  //   }


  //ERROR NULL FETCH
  useEffect(() => {
    const fetchCuriculumDetail = async () => {
      const token = localStorage.getItem("token"); // Ambil token jika dibutuhkan
      const url = `http://localhost:5050/Curiculum/get/${id}`;

      console.log("Fetching from URL:", url); // Debug URL API

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`, // Kirim token jika perlu
          },
        });

        console.log("Response Status:", res.status); // Debug HTTP Status

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Detail Data:", data); // Debug hasil fetch

        setCuriculum(data.data);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("An error occurred. Please try again.");
      }
    };

    if (id) {
      fetchCuriculumDetail();
    }
  }, [id]);




  return (
    <section className="w-full flex flex-col items-center justify-center p-6">
      {jurusan ? (
        <div className="w-10/12 flex flex-col lg:flex-row lg:min-h-screen gap-6">
          {/* Bagian Kiri: Deskripsi Jurusan */}
          <div className="lg:w-1/2 w-full pt-16 flex flex-col">
            <h1 className="lg:text-3xl text-xl font-serif">
              Jurusan <span className="text-orange-400">{jurusan.name}</span>
            </h1>
            <p className="lg:text-lg max-w-md text-justify mt-2 text-gray-700">{jurusan.deskripsi}</p>

            {/* List Guru */}
            <div className="flex overflow-x-auto gap-4 min-h-[13rem] max-h-[19rem] mt-8 pb-4">
              {jurusan.teachers?.map((teacher) => (
                <div key={teacher._id} className="lg:max-w-[13rem] lg:min-w-[13rem] bg-gray-100 rounded-lg shadow-md">
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
          <div className="lg:w-1/2 w-full flex flex-col items-center">
            <div className="flex lg:flex-col items-center h-full gap-2">
              {jurusan.images?.map((image, index) => (
                <div key={index} className="lg:min-w-[80%] lg:max-w-[80%] bg-black mb-4 rounded-lg overflow-hidden">
                  <img src={image} className="w-full h-full object-cover" alt={`Jurusan ${jurusan.name}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default DetailJurusan;
