import Side from "../components/Side";
import { useState, useEffect } from "react";
import { headers, serverPort } from '../utls/global_variable.js'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from "react-router-dom";

import SMKK1 from "../assets/smkk1.jpg";
import SMKK2 from "../assets/smkk2.jpg";
import SMKK3 from "../assets/smkk3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import SMK from '../assets/smkn1.jpg';

const CMS_web = () => {
    const [props, setProps] = useState({
        _id : "",
        name_website: "",
        logo: "",
        header_text: "",
        slogan: "",
        cover_background: "",

        info1: "",
        info2: "",
        info3: "",


        section1_title: "",
        section1_description: "",
        section1_image: "",


        section2_title: "",
        section2_description: "",
        section2_image: "",


        section3_title: "",
        section3_description: "",
        section3_image: "",


        alamat_telp: "",
        email: "",
        alamat_sekolah: "",
        gps_map_link: ""

    })

    useEffect(() => {
        AOS.init();
        handleGetContentCMS();
    }, [])


    const handleGetContentCMS = async () => {
        try {
            const res = await fetch(`${serverPort}/cms/get`, headers);
            const data = await res.json();
            console.log({ data })
            setProps(data.cms);

        } catch (error) {
            console.log({ error })
            Swal.fire("Whoppps!", error.message, 'error')
        }
    }

    const handleChangeInput = async (e) => {
        let newProp = { ...props, [e.target.id]: e.target.value }
        setProps(newProp)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const newProps = {...props, id : props._id}
        try {
            const res = await fetch(`${serverPort}/cms/save`, {
                method: "POST",
                headers,
                body: JSON.stringify(newProps)
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message)
            }
            Swal.fire("Succesfully!", data.message, 'success').then(() => window.location.reload())

        } catch (error) {
            console.log({ error })
            Swal.fire("Whoppps!", error.message, 'error')
        }
    }

    const handleChangeImage = async (e, key) => {

        console.log({ e, key })
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        formData.append('type', "image");

        const resfile = await fetch(`${serverPort}/file/save`, {
            method: "POST",
            body: formData,
            headers: {
                token: localStorage.getItem('token')
            }
        });

        const dataFile = await resfile.json();
        let newProps = { ...props, [key] : dataFile.url}
        setProps(newProps);

        console.log({newProps})
    }

    return (
        <form onSubmit={handleSubmitForm} className="flex lg:flex-row flex-col-reverse">
            <div className="lg:w-8/12">
                <Navbar size={`w-8/12`} opt={true} name={props.name_website} logoChange={props.logo} />
                <section
                    style={{
                        // backgroundImage: `url('https://images.unsplash.com/photo-1611941671018-6c3907cb7a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaG9vbCUyMGJ1aWxkaW5nfGVufDB8fDB8fHww')`,
                        backgroundImage: `url('${props.cover_background}')`,

                    }}
                    className="w-full relative rounded-lg flex bg-cover bg-center bg-fixed justify-center items-center min-h-[80vh] lg:min-h-screen"
                >

                    {/* bg black */}
                    <div className="absolute top-0 bg-[#000000]/80 left-0 w-full h-full">

                    </div>

                    <div className="w-11/12  h-full flex translate-y-1/2  lg:translate-y-0 text-center flex-col justify-center items-center">
                        <div className="w-full lg:min-h-[45vh] lg:max-h-[45vh] min-h-[5vh] max-h-[5vh] text-center flex flex-col justify-end items-center gap-4">
                            <h1 className="lg:text-5xl text-3xl font-serif font-medium text-blue-100">{props.header_text}</h1>

                            <p className="lg:max-w-xl max-w-sm my-4 text-base lg:text-xl font-serif text-white">
                                {props.slogan}
                            </p>
                            {/* <div className="flex gap-4 pb-8">
                      <button className="lg:px-4 px-2 py-2 text-sm lg:text-base lg:py-3 mt-2 bg-blue-400 rounded-lg">Example Button </button>
                      <button className="px-2 py-1 mt-2 bg-green-400 rounded-lg">Example Button </button>
                    </div> */}
                        </div>
                        <div className="w-full flex items-start gap-8 text-white justify-center h-[12vh] lg:h-[15vh] lg:mt-2 mt-auto">
                            <div className="flex flex-col">
                                {/* <span className="lg:text-xl text-sm">Jurusan Pilihan</span> */}
                                <span className="lg:text-base text-xs w-[200px]">{props.info1}</span>
                            </div>
                            <div className="flex flex-col">
                                {/* <span className="lg:text-xl text-sm">Lab Dan Tempat Praktik</span> */}
                                <span className="lg:text-base text-xs w-[200px]">{props.info2}</span>
                            </div>
                            <div className="flex flex-col">
                                {/* <span className="lg:text-xl text-sm">Ekstrakulikuler Siswa</span> */}
                                <span className="lg:text-base text-xs w-[200px]">{props.info3}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full justify-center flex mt-8">
                    <div className="w-10/12 justify-center flex flex-col items-center">
                        <div data-aos="fade-up" className="w-full flex items-start">
                            <div className="flex sm:flex-row flex-col gap-8">
                                <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[60vh] bg-cover bg-center" src={props.section1_image} alt="" />
                                <div className="">
                                    <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-mono font-medium">{props.section1_title} </h1>
                                    <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                                        {props.section1_description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-up" className="w-full flex items-end justify-end mt-8">
                            <div className="flex sm:flex-row flex-col gap-8">
                                <div className="flex flex-col items-end">
                                    <h1 className="text-blue-500 uppercase text-base lg:text-2xl text-justify font-mono font-medium">{props.section2_title}</h1>
                                    <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                                        {props.section2_description}
                                    </p>
                                </div>
                                <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[60vh] bg-cover bg-center" src={props.section2_image} alt="" />
                            </div>
                        </div>
                        <div data-aos="fade-up" className="w-full flex items-start mt-8">
                            <div className="flex sm:flex-row flex-col gap-8">
                                <img className="lg:min-w-[45vh] lg:max-w-[45vh]  lg:max-h-[45vh] lg:min-h-[45vh] min-w-[15vh] max-h-[60vh] bg-cover bg-center" src={props.section3_image} alt="" />
                                <div className="">
                                    <h1 className="text-blue-500 uppercase text-base lg:text-2xl font-mono font-medium">{props.section3_title} </h1>
                                    <p className="max-w-lg lg:text-base text-xs lg:font-normal font-thin text-justify">
                                        {props.section3_description}
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
                                <h1>{props.alamat_telp},</h1>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <span className="min-w-[5rem]">Email : </span>
                                <h1>{props.email}</h1>
                            </div>
                            <div className="flex gap-2 mb-2">
                                <span className="min-w-[5rem]">Alamat :</span>
                                <h1>{props.alamat_sekolah}, </h1>
                            </div>
                        </div>
                        <div className="lg:max-w-[50%] lg:min-w-[50%] w-full justify-center flex min-h-full">
                            <iframe
                                src={props.gps_map_link}
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

                {/* <section className="w-full justify-center flex mt-44 mb-12 lg:mt-14">
                <div className="lg:w-10/12 w-full">
                    <h1 className="text-center mb-4 text-blue-500 text-xl font-semibold font-mono">Our Latest Blog</h1>
                    <div className="flex gap-4 lg:gap-8 justify-center flex-wrap">
                        {blogs.map((blog) => (
                            <div data-aos="fade-up" key={blog._id} className="max-w-xs min-w-[20rem]  relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                <div className="min-h-[85%] max-h-[85%]">
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
                                <div className="ml-4 pb-4">
                                    <Link to={`/blog/${blog._id}`} className="inline-flex   items-center lg:px-3 lg:py-2 px-2 py-1 lg:text-sm text-[0.5rem]  font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            </div>

            <div className="lg:w-4/12 fixed top-0 end-0 z-10 h-screen">
                <section className="border-b px-5 py-6 shadow-md flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-700/70">
                        Setting Website
                    </div>
                    <div className="flex ">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Website</button>
                        <Link to={'/dashboard/home'} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Kembali</Link>
                    </div>
                </section>
                <div className="overflow-y-auto h-[90vh]">
                    <div className="flex flex-col  p-8 py-4">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Name Website</label>
                            <input type="text" id="name_website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis nama website.." onChange={handleChangeInput} required defaultValue={props.name_website} />
                        </div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Header text</label>
                            <input type="text" id="header_text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis text untuk header.." required onChange={handleChangeInput} defaultValue={props.header_text} />
                        </div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Slogan</label>
                            <input type="text" id="slogan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan Slogan Sekolah" onChange={handleChangeInput} defaultValue={props.slogan} />
                        </div>

                        <div className="flex flex-col gap-1 mb-3">
                            <label for="logo_web" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Logo web</label>
                            <input type="file" 
                            onChange={(e) => handleChangeImage(e, "logo")} 
                            id="logo_web" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" hidden />
                            <label htmlFor="" for="logo_web">
                                <div
                                    style={{ backgroundImage: `url('${props.logo}')` }}
                                    className="w-full h-[30vh] cursor-pointer bg-center bg-cover"></div>
                            </label>
                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label for="bg_cover" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Background Cover</label>
                            <input type="file" 
                            onChange={(e) => handleChangeImage(e, "cover_background")}
                            id="bg_cover" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" hidden />
                            <label htmlFor="" for="bg_cover">
                                <div className="w-full h-[30vh] cursor-pointer bg-center bg-cover"
                                    style={{ backgroundImage: `url('${props.cover_background}')` }}
                                ></div>
                            </label>
                        </div>

                        <div className="border-b-2 w-full my-3"></div>

                        <div>
                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Information 1</label>
                            <textarea id="info1" onChange={handleChangeInput} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="informasi pertama.." defaultValue={props.info1}></textarea>
                        </div>
                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Information 2</label>
                            <textarea id="info2" onChange={handleChangeInput} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={props.info2} placeholder="informasi kedua..."></textarea>

                        </div>
                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Information 3</label>
                            <textarea id="info3" onChange={handleChangeInput} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={props.info3} placeholder="informasi ketiga..."></textarea>

                        </div>

                        <div className="border-b-2 w-full my-3"></div>

                        <div>
                            <label for="logo_web" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 1 - Title</label>
                            <input type="text" onChange={handleChangeInput} id="section1_title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan title untuk section 1" required defaultValue={props.section1_title} />

                        </div>
                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 1 - Description</label>
                            <textarea id="section1_description" onChange={handleChangeInput} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tuliskan deskripsi atau isi untuk section 1..." defaultValue={props.section1_description}></textarea>

                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label for="section1_image" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 1 - Image</label>
                            <input type="file" 
                            onChange={(e) => handleChangeImage(e, "section1_image")}
                            id="section1_image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" hidden />
                            <label htmlFor="" for="section1_image">
                                <div
                                    style={{ backgroundImage: `url('${props.section1_image}')` }}
                                    className="w-full h-[30vh] cursor-pointer bg-center bg-cover"></div>

                            </label>
                        </div>
                        <div className="border-b-2 w-full my-3"></div>

                        <div>
                            <label for="" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 2 - Title</label>
                            <input type="text" onChange={handleChangeInput} id="section2_title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan title untuk section 2" defaultValue={props.section2_title} required />

                        </div>
                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 2 - Description</label>
                            <textarea onChange={handleChangeInput} id="section2_description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan deskripsi / isi section 2..." defaultValue={props.section2_description}></textarea>

                        </div>
                        <div className="flex flex-col gap-1 mb-3">
                            <label for="section2_image" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 2 - Image</label>
                            <input type="file" 
                            onChange={(e) => handleChangeImage(e, "section2_image")}
                            id="section2_image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" hidden />
                            <label htmlFor="" for="section2_image">
                                <div
                                    style={{ backgroundImage: `url('${props.section2_image}')` }}
                                    className="w-full h-[30vh] cursor-pointer bg-center bg-cover"></div>

                            </label>
                        </div>
                        <div className="border-b-2 w-full my-3"></div>

                        <div>
                            <label for="logo_web" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 3 - Title</label>
                            <input type="text" onChange={handleChangeInput} id="section3_title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan Title untuk section 3.." defaultValue={props.section3_title} required />

                        </div>
                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 3 - Description</label>
                            <textarea onChange={handleChangeInput} id="section3_description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tuliskan Deskripsi / isi untuk section 3.." defaultValue={props.section3_description}></textarea>

                        </div>
                        <div className="flex flex-col gap-1 mb-3 ">
                            <label for="section3_image" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Section 3 - Image</label>
                            <input type="file" 
                            onChange={(e) => handleChangeImage(e, "section3_image")}
                            id="section3_image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" hidden />
                            <label htmlFor="" for="section3_image">
                                <div className="w-full h-[30vh] cursor-pointer bg-center bg-cover"
                                    style={{ backgroundImage: `url('${props.section3_image}')` }}
                                ></div>

                            </label>
                        </div>

                        <div className="border-b-2 w-full my-3"></div>

                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                </svg>
                            </div>
                            <input type="text" id="alamat_telp" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="No telp sekolah" defaultValue={props.alamat_telp} required />
                        </div>

                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email </label>
                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email sekolahh.." onChange={handleChangeInput} defaultValue={props.email} required />
                        </div>

                        <div>

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Alamat Sekolah</label>
                            <textarea id="alamat_sekolah" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulisan Alamat sekolah.." onChange={handleChangeInput} defaultValue={props.alamat_sekolah}></textarea>

                        </div>

                        <div className="mb-16">

                            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">gps_map_link</label>
                            <input type="text" id="gps_map_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tempel Link Gmaps disini.." onChange={handleChangeInput} defaultValue={props.gps_map_link} required />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default CMS_web;
