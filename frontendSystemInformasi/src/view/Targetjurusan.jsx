import React from "react";

const Targetjurusan = () => {
  const jurusan = {
    nama: "Rekayasa Perangkat Lunak",
    deskripsi:
      "Jurusan Rekayasa Perangkat Lunak (RPL) berfokus pada pembelajaran tentang pengembangan perangkat lunak, mulai dari pemrograman, analisis kebutuhan, desain sistem, hingga implementasi dan pemeliharaan perangkat lunak.",
    mataPelajaran: [
      "Pemrograman Dasar",
      "Basis Data",
      "Jaringan Komputer",
      "Pengembangan Web",
      "Pemrograman Mobile",
    ],
    guru: [
      { nama: "Budi Santoso", mapel: "Pemrograman Dasar" },
      { nama: "Rina Sari", mapel: "Basis Data" },
      { nama: "Joko Widodo", mapel: "Jaringan Komputer" },
      { nama: "Siti Nurhaliza", mapel: "Pengembangan Web" },
      { nama: "Dedi Setiawan", mapel: "Pemrograman Mobile" },
    ],
    galeri: [
      "/images/classroom.jpg",
      "/images/coding.jpg",
      "/images/networking.jpg",
    ],
  };

  return (
    <section className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">{jurusan.nama}</h1>
        <p className="text-lg text-gray-700 text-center mb-8 px-4 md:px-0">{jurusan.deskripsi}</p>

        {/* Daftar Guru */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Guru Pengajar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jurusan.guru.map((guru, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-xl text-center transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-blue-500">{guru.nama}</h3>
              <p className="text-gray-600">{guru.mapel}</p>
            </div>
          ))}
        </div>

        {/* Mata Pelajaran */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Mata Pelajaran</h2>
        <ul className="list-disc list-inside bg-gray-100 p-6 rounded-xl mb-8 max-w-lg mx-auto">
          {jurusan.mataPelajaran.map((mapel, index) => (
            <li key={index} className="text-gray-700">{mapel}</li>
          ))}
        </ul>

        {/* Galeri */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Galeri Kegiatan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jurusan.galeri.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Galeri ${index + 1}`}
              className="w-full h-40 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Targetjurusan;