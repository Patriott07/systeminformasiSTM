import react from "react";
import Doc2 from "../assets/Dock.png"
import Kegi9 from "../assets/Kegi9.jpg"
import Kegi10 from "../assets/Kegi10.jpg"
import Kegi11 from "../assets/Kegi11.jpg"
import Kegi12 from "../assets/Kegi12.jpg"

const Jurusan = () => {
  return (
    <>
    
      <nav className="w-full bg-gray-900 text-white py-4 fixed top-0 z-50 ">
        <div className="w-10/12 mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SMA BAKTI KOTA CIREBON</h1>
          <div className="flex gap-8">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="blog" className="hover:text-blue-400">Blog</a>
            <a href="/Kegiatan" className="hover:text-blue-400">
            Kegiatan
            </a>
            <a href="/jurusan" className="hover:text-blue-400">Jurusan</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex justify-center">
          <div className="w-10/12  flex  justify-center">
          <div className="max-w-[50%] min-h-screen  flex flex-col justify-center">
          <h1 className="max-w-md text-3xl font-serif"><span className="text-blue-500">Lorem ipsum dolor sit amet,</span> consectetur adipisicing elit. Qui aliquid corrupti laborum eaque earum maxime vero.</h1>
            <div className="mt-6">
              <p className="max-w-sm font-serif"> "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quod, sequi quos sint consequuntur dicta."</p>
            </div>
          </div>
          <div className="max-w-[50%] min-w-[50%] min-h-screen items-center  flex flex-col justify-center">
            <div className="flex gap-4">
              <div className="w-[13rem] rounded-br-3xl overflow-hidden h-[13rem] bg-black" >
                <img className="bg-cover " src={Kegi10} alt="" />
              </div>
              <div className="w-[13rem] h-[13rem] rounded-bl-3xl overflow-hidden bg-black" >
              <img className="bg-cover " src={Kegi11} alt="" />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-[13rem] h-[13rem] rounded-tr-3xl overflow-hidden bg-black" >
              <img className="bg-cover " src={Kegi12} alt="" />
              </div>
              <div className="w-[13rem] h-[13rem]  rounded-tl-3xl overflow-hidden bg-black" >
              <img className="bg-cover " src={Kegi9} alt="" />
              </div>
            </div>
          </div>
          </div>
      </section>


        <section className="w-full justify-center items-center flex flex-col ">
            <div className="w-11/12 flex min-h-screen gap-2 max-h-screen ">
                <div className="w-1/2 max-w-[50%] min-h-screen max-h-screen pt-[4.1rem]  flex flex-col  ">
                <h1 className="text-3xl font-serif">Jurusan <span className="text-orange-400">Rekayasa Perangkat Lunak</span></h1>
                <p className="text-lg max-w-md text-justify mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita consequatur blanditiis ut deleniti repellendus rem, facilis, enim inventore eveniet maiores aliquam, similique distinctio commodi placeat.</p>
                <div className="flex overflow-x-auto min-h-[17rem] gap-4 max-h-[17rem] mt-8">
              <div className="max-w-[13rem] min-w-[13rem] min-h-[16rem] max-h-[16rem] bg-gray-200 ">
                <div className="w-full h-[65%] ">
                    <img className=" bg-cover bg-center" src={Doc2} alt="" />
                </div>
                <div className=" mt-4 ml-2">
                    <h1 className="text-xl">Aji Saputro</h1>
                    <h1 className="text-lg font-light">Bahasa Indonesia</h1>
                </div>
              </div>
              <div className="max-w-[13rem] min-w-[13rem] min-h-[16rem] max-h-[16rem] bg-gray-200 ">
                <div className="w-full h-[65%] ">
                    <img className=" bg-cover bg-center" src={Doc2} alt="" />
                </div>
                <div className=" mt-4 ml-2">
                    <h1 className="text-xl">Aji Saputro</h1>
                    <h1 className="text-lg font-light">Bahasa Indonesia</h1>
                </div>
              </div>
                <div className="max-w-[13rem] min-w-[13rem] min-h-[16rem] max-h-[16rem] bg-gray-200 ">
                    <div className="w-full h-[65%] ">
                        <img className=" bg-cover bg-center" src={Doc2} alt="" />
                    </div>
                    <div className=" mt-4 ml-2">
                        <h1 className="text-xl">Aji Saputro</h1>
                        <h1 className="text-lg font-light">Bahasa Indonesia</h1>
                    </div>
                </div>
                <div className="max-w-[13rem] min-w-[13rem] min-h-[16rem] max-h-[16rem] bg-gray-200 ">
                    <div className="w-full h-[65%] ">
                        <img className=" bg-cover bg-center" src={Doc2} alt="" />
                    </div>
                    <div className=" mt-4 ml-2">
                        <h1 className="text-xl">Aji Saputro</h1>
                        <h1 className="text-lg font-light">Bahasa Indonesia</h1>
                    </div>
                </div>
                <div className="max-w-[13rem] min-w-[13rem] min-h-[16rem] max-h-[16rem] bg-gray-200 ">
                    <div className="w-full h-[65%] ">
                        <img className=" bg-cover bg-center" src={Doc2} alt="" />
                    </div>
                    <div className=" mt-4 ml-2">
                        <h1 className="text-xl">Aji Saputro</h1>
                        <h1 className="text-lg font-light">Bahasa Indonesia</h1>
                    </div>
                </div>
              
             
            
            </div>
                </div>
                <div className="w-1/2 max-w-[50%] min-h-screen max-h-screen  pt-[4.1rem] flex flex-col">
                        <div className="flex flex-col items-center h-full">
                            <div className="w-[80%] h-[40%] bg-black mb-3 rounded-lg overflow-hidden">
                                  
                            </div>
                            <div className="w-[80%] h-[40%] bg-black overflow-hidden rounded-lg "> 
                                  
                            </div>
                        </div>
                </div>
            </div>
        </section>
      
    </>
  )
};

export default Jurusan;