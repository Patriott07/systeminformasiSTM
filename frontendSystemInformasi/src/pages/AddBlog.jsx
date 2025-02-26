import { useEffect, useState } from "react";
import Side from "../components/Side";
import { headers, serverPort } from '../utls/global_variable.js';

import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const AddBlog = () => {

  const [elements, setElements] = useState([]);
  const [isShowResult, setShowResult] = useState(false);
  const [contents, setContents] = useState([]);
  const [countDoc, setCountDoc] = useState(0);
  const [indexEl, setIndexEl] = useState(0);
  const [resultValueBlog, setResultValueBlog] = useState({});
  const [elementsBlog, setElementsBlog] = useState([]);
  const [tags, setTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  // form
  const [titleInput, setTitleInput] = useState(null);
  const [dateInput, setDateInput] = useState(null);
  const [cover_blog, setCoverBlog] = useState(null);
  const [tagsInput, setTagsInput] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    console.log({ tagsInput })
  }, [tagsInput])

  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;
    console.log({ event, id })
    setTagsInput((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleAddComponent = (type) => {

    const container = document.getElementsByClassName('docs')[0];

    if (type == "text") {
      const textarea = document.createElement("textarea");

      textarea.className =
        "input-component block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

      textarea.placeholder = "Start Writing here";
      textarea.name = indexEl;
      textarea.setAttribute('data-type', 'text');

      textarea.addEventListener("onchange", (e) => {
        console.log("Input changed:", e.target.value);
      });

      container.appendChild(textarea);

      setElementsBlog([...elementsBlog, textarea]);
    }

    if (type == "img") {
      const input = document.createElement('input');
      const inputValue = document.createElement('input');
      const label = document.createElement('label');

      inputValue.type = "text";
      inputValue.id = "file-" + countDoc;
      inputValue.hidden = true;
      // inputValue.name = indexEl;

      label.for = "file_input";
      label.className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
      label.innerHTML = "Choose Image"

      // input.name = "photo";
      input.name = indexEl;
      input.setAttribute('data-type', 'img');
      input.className = "input-component block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      input.type = "file";
      input.id = "file_input"
      input.accept = "image/*"
      input.onchange = (event) => handleChangeInputFile(event, "image", countDoc);

      container.appendChild(inputValue);
      container.appendChild(label);
      container.appendChild(input);

      setElementsBlog([...elementsBlog, input]);

    }

    if (type == "video") {
      const input = document.createElement('input');
      const inputValue = document.createElement('input');
      const label = document.createElement('label');

      inputValue.hidden = true;
      inputValue.type = "text";
      inputValue.id = "file-" + countDoc;


      label.for = "file_input";
      label.className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
      label.innerHTML = "Choose Video";

      input.name = indexEl;
      input.setAttribute('data-type', 'video');
      input.className = "input-component block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
      input.type = "file";
      input.id = "file_input"
      input.accept = "video/*"
      input.onchange = (event) => handleChangeInputFile(event, "video", countDoc);

      container.appendChild(inputValue);
      container.appendChild(label);
      container.appendChild(input);

      setElementsBlog([...elementsBlog, input]);

    }

    setCountDoc(countDoc + 1);
    setIndexEl(indexEl + 1);

  };

  const handleChangeInputFile = async (e, type, id) => {
    console.log({ type, e }, 'woy udah onchange ni')

    const formData = new FormData();

    formData.append("type", type);
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch(`${serverPort}/file/save`,
        {
          method: "POST",
          body: formData,
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )

      const data = await res.json();
      console.log({ data })
      document.getElementById(`file-${id}`).value = data.url;

    } catch (error) {
      console.log({ error })
    }
  }


  const handleFetchTags = async (SQ) => {
    let url = `${serverPort}/tags/get`;

    try {
      const res = await fetch(url, {
        headers
      })

      const data = await res.json();
      console.log({ data })

      setTags(data.data);

    } catch (error) {
      console.log({ message: "Something wrong while fetch users", error })
    }
  }

  useEffect(() => {
    handleFetchTags();
  }, []);

  const handleChangeCoverBlog = async (e) => {
    try {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('type', "image");

      const resfile = await fetch(`${serverPort}/file/save`, {
        method: "POST",
        body: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      });

      const dataFile = await resfile.json();

      const imageViewer = document.getElementById("image-viewer");
      imageViewer.classList.add(`bg-[url(${dataFile.url})]`);
      setCoverBlog(dataFile.url);

    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    console.log({ contents })
  }, [contents]);

  const handleChangeInput = (e, i) => {

    const newContents = contents.map((item) =>
      item.i === i ? { ...item, content: e.target.value } : item
    );

    console.log({ newContents })
    setContents(newContents);
  };

  const handleChangeFile = (e, i, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const newContents = contents.map((item) =>
      item.i === i ? { ...item, content: URL.createObjectURL(file) } : item
    );
    setContents(newContents);
  };

  const HandleShowComponent = ({ type, i }) => {
    console.log({ type, i })
    if (type.type == "text") {
      return (

        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={contents[i]?.content || ''} // Gunakan value, bukan children
          onChange={(e) => handleChangeInput(e, i)}
        ></textarea>

      )
    }
    if (type.type == "img") {
      return (
        <div>

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Choose image</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="image/*"
            onChange={(e) => handleChangeFile(e, i, "img")} />

        </div>
      )
    }
    if (type.type == "video") {
      return (
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Choose Video</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="video/*"
            onChange={(e) => handleChangeFile(e, i, "video")} />
        </div>
      )
    }
  }

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    console.log({ e, elementsBlog });

    try {
      let format = [];
      await Promise.all(

        Array.from(elementsBlog).map(async (el, _i) => {
          try {
            console.log({ el, _i }, el.getAttribute('data-type'))
            let type_data = el.getAttribute('data-type');
            let property = {};

            if (type_data == "img" || type_data == "video") {
              let formData = new FormData();
              formData.append('file', el.files[0]);
              if (type_data == "img") {
                formData.append('type', "image");
                property.type = "img";

              } else if (type_data == "video") {
                formData.append('type', "video");
                property.type = "vidio";
              }

              const resfile = await fetch(`${serverPort}/file/save`, {
                method: "POST",
                body: formData,
                headers: {
                  token: localStorage.getItem('token')
                }
              });

              const dataFile = await resfile.json();
              property.content = dataFile.url;

              format.push(property);
            } else {
              console.log({ el })

              format.push({
                type: "text",
                content: el.value
              });
            }


          } catch (error) {
            console.log({ error })
          }
        })

      )

      console.log({ format })

      const res = await fetch(`${serverPort}/blog/create`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: titleInput,
            date: dateInput,
            photo: cover_blog,
            tags: tagsInput,
            contents: format
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      Swal.fire("Succesfully", data.message, "success").then(() => navigate('/data_blog'));

    } catch (error) {
      console.log({ error });
      Swal.fire("Something Wrong", error.message, "error");
    }
  }
  return (
    <form onSubmit={handleSubmitBlog} encType="multipart/form-data" className="flex justify-between">
      <Side />
      <div
        class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"

      >
        <div class=" flex h-full bg-gray-100 justify-between">
          <div className="ms-[5vw] sm:w-8/12 p-8 text-[#110B56]">
            <div className="text-2xl font-semibold mb-3">
              Create Your Contents
            </div>

            <div className="docs">

            </div>
            {elements.map((val, _i) => (
              <HandleShowComponent type={val} i={val.i} />
            ))}


            <div className="flex gap-2 my-5 ">
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('text')}>Add new Text</button>
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('img')}>Add new Image</button>
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('video')}>Add new Vidio</button>

              <button type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>


            </div>
          </div>
          <div className="sm:w-4/12 h-[100vh] bg-white border-l">
            <div className="bg-purple-600 px-4 py-8 text-white font-semibold">
              Create Information Blog
            </div>

            <div className="flex justify-center items-center py-5">
              <div className="flex flex-col w-full px-4 ">
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Blog</label>
                  <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required onChange={(e) => setTitleInput(e.target.value)} />
                </div>
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Blog</label>
                  <input
                    onChange={(e) => setDateInput(e.target.value)}
                    type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required />
                </div>
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Blog</label>
                  <input type="file" id="first_name" onChange={handleChangeCoverBlog} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulldark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required />
                </div>


                <div id="image-viewer" className="bg w-full h-[30vh] bg-center bg-cover bg-gray-800/40 rounded-sm">

                </div>
                <div className="flex mt-3 justify-between">
                  <div className="text-sm font-semibold">Add Categories</div>
                  

                </div>
             
                  <div className="flex flex-wrap mt-3 items-center gap-2">
                    {tags.map((checkbox) => (
                      <div key={checkbox._id} className="flex items-center flex-wrap">
                        <input
                          id={checkbox.name}
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-5"
                        />
                        <label
                          htmlFor={checkbox.id}
                          className="ms-1 mt-1 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          {checkbox.name}
                        </label>
                      </div>
                    ))}
                  </div>

                <div className="flex mt-3">
                  <button onClick={() => navigate('/data_blog')} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Back To Home</button>

                  {/* {
                    contents.
                  } */}

                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;