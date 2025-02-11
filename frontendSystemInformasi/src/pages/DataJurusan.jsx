import Side from "../components/Side";
import { useState } from "react";

const DataJurusan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Post 1",
      deskripsi: "#Beginner",
      images: "Nov 21, 2021",
    },
  ]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleEditChange = (e) => {
    setSelectedPost({
      ...selectedPost,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = () => {
    setPosts(
      posts.map((post) =>
        post.id === selectedPost.id ? { ...selectedPost } : post
      )
    );
    closeModal();
  };

  return (
    <div className="flex justify-between">
      <Side />
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Data Jurusan
                </p>
              </div>
              <div className="p-4 @container flex justify-between border">
                  <p className="text-[#111418] text-base font-bold leading-tight">
                    Add New Post 
                  </p>
                  <a
                    className="text-base font-bold leading-normal tracking-[0.015em] flex gap-2 text-[#111418] justify-between"
                    href="add_jurusan"
                  >
                    Add Post
                    <div
                      className="text-[#111418]"
                      data-icon="ArrowRight"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                      </svg>
                    </div>
                  </a>
              </div>
              <h3 className="text-lg font-bold px-4 pb-2 pt-4">All Posts</h3>
              <table className="w-full border-collapse bg-white mt-4 shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Deskripsi</th>
                    <th className="px-4 py-3 text-left">Images</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{post.name}</td>
                      <td className="px-4 py-3">{post.deskripsi}</td>
                      <td className="px-4 py-3">{post.images}</td>
                      <td className="px-4 py-3 flex gap-3">
                        <button
                          onClick={() => openModal(post)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">Edit Post</h2>
                    <h3 class="text-[#111418] text-lg leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                      Name
                    </h3>
                    <input
                      type="text"
                      name="nama"
                      value={selectedPost?.nama || ""}
                      onChange={handleEditChange}
                      className="w-full border p-2 rounded mb-2"
                      placeholder="Add Name"
                    />
                    <h3 class="text-[#111418] text-lg leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                        Description
                    </h3>
                    <textarea
                      type="text"
                      name="deskripsi"
                      value={selectedPost?.deskripsi || ""}
                      onChange={handleEditChange}
                      className="w-full border p-2 rounded mb-2"
                      placeholder="Add Deskripsi"
                    />
                    <h3 class="text-[#111418] text-lg leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                      Images
                    </h3>
                    <input
                      type="file"
                      name="images"
                      value={selectedPost?.images || ""}
                      onChange={handleEditChange}
                      className="w-full border rounded mb-2"
                      
                    />
                    <h3 class="text-[#111418] text-lg leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                      Teachers
                    </h3>
                    <input
                      type="text"
                      name="teachers"
                      value={selectedPost?.teachers || ""}
                      onChange={handleEditChange}
                      className="w-full border p-2 rounded mb-2"
                      placeholder="Add Guru"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataJurusan;
