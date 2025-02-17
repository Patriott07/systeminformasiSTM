import { useEffect, useState } from "react";
import Side from "../components/Side";
import { headers, serverPort } from '../utls/global_variable.js';


const AddBlog = () => {

  const [elements, setElements] = useState([]);
  const [isShowResult, setShowResult] = useState(false);
  const [contents, setContents] = useState([]);
  const [countDoc, setCountDoc] = useState(0);

  const handleAddComponent = (type) => {

    const container = document.getElementsByClassName('docs')[0];

    if (type == "text") {
      const textarea = document.createElement("textarea");

      textarea.className =
        "input-component block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

      textarea.placeholder = "Start Writing here";

      textarea.addEventListener("onchange", (e) => {
        console.log("Input changed:", e.target.value);
      });

      container.appendChild(textarea);

    }

    if (type == "img") {
      const input = document.createElement('input');
      const inputValue = document.createElement('input');
      const label = document.createElement('label');

      inputValue.type = "text";
      inputValue.id = "file-" + countDoc;
      inputValue.hidden = true;

      label.for = "file_input";
      label.className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
      label.innerHTML = "Choose Image"

      input.name = "photo";
      input.className = "input-component block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      input.type = "file";
      input.id = "file_input"
      input.accept = "image/*"
      input.onchange = (event) => handleChangeInputFile(event, "image", countDoc);

      container.appendChild(inputValue);
      container.appendChild(label);
      container.appendChild(input);

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

      input.name = "video";
      input.className = "input-component block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
      input.type = "file";
      input.id = "file_input"
      input.accept = "video/*"
      input.onchange = (event) => handleChangeInputFile(event, "video", countDoc);

      container.appendChild(inputValue);
      container.appendChild(label);
      container.appendChild(input);

    }

    setCountDoc(countDoc + 1);
  };
  
  const handleChangeInputFile = async (e, type, id) => {
    console.log({ type, e }, 'woy')

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

  const handleSubmitBlog = (e) => {
    e.preventDefault();

    try {
      const documentsMedia = Array.from(document.getElementsByClassName("input-component"));

      console.log('oke', documentsMedia, documentsMedia.length, {e})

      for (let i = 0; i < documentsMedia.length; i++) {

        if (documentsMedia[i].type == "textarea") {
          //   console.log({doc : documentsMedia[i].value})
          console.log(documentsMedia[i].value)

        } else {
          console.log(documentsMedia[i].files[0])
        }
      }
      console.log('oke1', documentsMedia, documentsMedia.length)


    } catch (error) {

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


            <div className="flex gap-2 my-5">
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('text')}>Add new Text</button>
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('img')}>Add new Image</button>
              <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => handleAddComponent('video')}>Add new Vidio</button>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setShowResult(!isShowResult)}>{isShowResult ? 'Hide Result' : 'Show Result'}</button>

            </div>
          </div>
          <div className="sm:w-4/12 h-[100vh] bg-white border-l">
            <div className="bg-purple-600 px-4 py-8 text-white font-semibold">
              Create Information Blog
            </div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col w-full px-4 ">
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Blog</label>
                  <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required />
                </div>
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Blog</label>
                  <input type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required />
                </div>
                <div className="">
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Blog</label>
                  <input type="file" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulldark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Judul blog anda" required />
                </div>

                <div className="bg w-full h-[30vh] bg-gray-800 rounded-sm">

                </div>

                <div className="text-sm mt-3">Add Categories</div>

                <div class="flex items-center mb-4 flex-wrap">
                  <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-5" />
                  <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>

                </div>

                <div className="flex">
                  <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel Form</button>


                  <button type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>
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
