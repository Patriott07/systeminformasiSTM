import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SMK from "../assets/smkn1.jpg";
import { serverPort } from "../utls/global_variable";

const DetailJurusan = () => {
  const { id } = useParams(); // Ambil id dari parameter URL
  const [jurusan, setJurusan] = useState(null);
  const [error, setError] = useState(null);
  const [curiculum, setCuriculum] = useState([]);
  const [curiculumDetail, setCuriculumDetail] = useState([]);

  const [mapels, setMapels] = useState([]);
  const [indexCuriculum, setIndexCuriculum] = useState(1);

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

  const fetchMapels = async (id) => {
    try {
      const res = await fetch(`${serverPort}/Curiculum/get/mapels/${id}`);
      const data = await res.json();

      console.log({ data });
      setMapels(data.mapels);
      setCuriculumDetail(data.curiculum);
      setIndexCuriculum(data.curiculum.semester);
    } catch (error) {
      console.log({ error });
    }
  };

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
        console.log({ data });
        console.log("Fetched Detail Data:", data); // Debug hasil fetch

        let sorterData = data.curiculum.sort(function(a, b) { return a.semester - b.semester });

        console.log({sorterData})
        fetchMapels(sorterData[0]._id);
        setCuriculum(sorterData);
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
    <>
      <section
        style={{
          backgroundImage: `url('${jurusan ? jurusan.images[0] : null}')`,
        }}
        className="w-full relative rounded-lg flex bg-cover bg-center bg-fixed justify-center items-center min-h-[80vh] lg:min-h-screen"
      >
        {/* bg black */}
        <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full"></div>

        <div className="w-11/12  h-full flex translate-y-1/2  lg:translate-y-0 text-center flex-col justify-center items-center">
          <div className="w-full lg:min-h-[45vh] lg:max-h-[45vh] min-h-[5vh] max-h-[5vh] text-center flex flex-col justify-end items-center gap-4">
            <h1 className="lg:text-5xl text-3xl font-serif font-medium text-blue-100">SELAMAT DATANG DI JURUSAN</h1>
            <span className="lg:text-5xl text-3xl font-serif font-medium text-blue-400">{jurusan ? jurusan.name : null}</span>
            <p className="lg:max-w-xl max-w-sm my-4 text-base lg:text-xl font-serif text-white">{jurusan ? jurusan.deskripsi : null}</p>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center p-6">
        {jurusan ? (
          <div className="flex flex-col sm:w-10/12 w-11/12 pb-20">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Bagian Kiri: Deskripsi Jurusan */}

              <div className="lg:w-2/3 w-full flex flex-col">
                <Link to={"/"} className="font-semibold text-blue-600 cursor-pointer">
                  {"<- Kembali"}
                </Link>
                <h1 className="lg:text-3xl text-xl font-serif">
                  Jurusan <span className="text-orange-400">{jurusan.name}</span>
                </h1>
                <p className="lg:text-lg max-w-md text-justify mt-2 text-gray-700">{jurusan.deskripsi}</p>

                {/* List Guru */}
                <div className="flex overflow-x-auto gap-4 min-h-[13rem] max-h-[19rem] mt-8 pb-4">
                  {jurusan.teachers?.map((teacher) => (
                    <div key={teacher._id} className="lg:max-w-[13rem] max-w-[13rem] min-w-[13rem] lg:min-w-[13rem] bg-gray-100 rounded-lg shadow-md">
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
              <div className="lg:w-1/3 w-full flex flex-col items-center">
                <div className="text-md mb-2 font-semibold text-gray-600/70 w-full text-start max-w-[80%]">Foto Seputar Jurusan</div>
                <div className="flex flex-col sm:flex-row lg:flex-col items-center h-full gap-2">
                  {jurusan.images?.map((image, index) => (
                    <div key={index} className="lg:min-w-[80%] lg:max-w-[80%] bg-black mb-4 rounded-lg overflow-hidden">
                      <img src={image} className="w-full h-full object-cover" alt={`Jurusan ${jurusan.name}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* table curiculum */}
            <div className="text-2xl font-semibold mb-2 mt-8">
              Informasi Pembelajaran & <span className="text-orange-400">Kurikulum</span>{" "}
            </div>
            <div className="flex py-3 w-full overflow-y-auto">
              {curiculum.length > 0
                ? curiculum.map((val, _i) => {
                    return (
                      <span
                        onClick={() => fetchMapels(val._id)}
                        class={
                          indexCuriculum == _i + 1
                            ? `bg-blue-300 text-blue-800 cursor-pointer font-semibold text-sm me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300`
                            : `bg-blue-100 text-blue-800 cursor-pointer font-semibold text-sm me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300`
                        }
                      >
                        Semester {val.semester}
                      </span>
                    );
                  })
                : null}
            </div>
            <div class="relative overflow-x-auto shadow-2xl">
              <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                <thead class="text-xs uppercase bg-gray-900 text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-white">
                      Nama Mapel
                    </th>
                    <th scope="col" class="px-6 py-3 text-white">
                      Jam per minggu
                    </th>
                    <th scope="col" class="px-6 py-3 text-white">
                      Jurusan
                    </th>
                    <th scope="col" class="px-6 py-3 text-white">
                      Kelas
                    </th>
                    <th scope="col" class="px-6 py-3 text-white">
                      Semester
                    </th>
                    <th scope="col" class="px-6 py-3 text-white">
                      Tahun
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mapels.length > 0
                    ? mapels.map((val, _id) => {
                        return (
                          <tr class="bg-white border-b border-gray-500 hover:bg-gray-400/40 text-gray-800">
                            <td class="px-6 py-4">{val.nama_mapel}</td>
                            <td class="px-6 py-4">{val.jam_per_minggu} Jam / Minggu</td>
                            <th scope="row" class="px-6 py-4  ">
                              {curiculumDetail.nama_jurusan}
                            </th>
                            <td class="px-6 py-4">{curiculumDetail.kelas}</td>
                            <td class="px-6 py-4">{curiculumDetail.semester}</td>
                            <td class="px-6 py-4">{curiculumDetail.year}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default DetailJurusan;
