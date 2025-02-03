import { useState } from "react";

const CrudBlog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Go SMKN1 Cirebon",
      image: "https://via.placeholder.com/50",
      description: "Journey Jawa",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openEditModal = (blog) => {
    setEditData(blog);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const addData = (newBlog) => {
    setBlogs([...blogs, { id: blogs.length + 1, ...newBlog }]);
    closeModals();
  };

  const updateData = (updatedBlog) => {
    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
    closeModals();
  };

  const deleteData = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fixed inset-0 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">📝 List Blog</h2>
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition active:scale-95"
          >
            ➕ Tambah Data
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3">ID</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Image</th>
              <th className="border p-3">Deskripsi</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-100 transition">
                <td className="border p-3 text-center font-sans">{blog.id}</td>
                <td className="border p-3 text-center font-serif">{blog.title}</td>
                <td className="border p-3 text-center">
                  <img src={blog.image} alt={blog.title} className="rounded-lg w-12 h-12 object-cover" />
                </td>
                <td className="border p-3 text-center font-serif">{blog.description}</td>
                <td className="border p-3 text-center space-x-2">
                  <button 
                    onClick={() => openEditModal(blog)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition active:scale-95"
                  >✏️ Edit</button>
                  <button 
                    onClick={() => deleteData(blog.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
                  >🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && <Modal title="Tambah Data" onClose={closeModals} onSave={addData} />}
      {isEditModalOpen && <Modal title="Edit Data" blog={editData} onClose={closeModals} onSave={updateData} />}
    </div>
  );
};

const Modal = ({ title, onClose, onSave, blog }) => {
  const [titleInput, setTitleInput] = useState(blog ? blog.title : "");
  const [description, setDescription] = useState(blog ? blog.description : "");
  const [image, setImage] = useState(blog ? blog.image : "");

  const handleSave = () => {
    onSave({ id: blog ? blog.id : Date.now(), title: titleInput, image, description });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">{title}</h2>
        <input 
          type="text" 
          value={titleInput} 
          onChange={(e) => setTitleInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring focus:ring-blue-200" 
          placeholder="Masukkan Title"
        />
        <input 
          type="file" 
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} 
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring focus:ring-blue-200"
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="h-32 w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-200" 
          placeholder="Write your blog content here..." required
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition active:scale-95"
          >❌ Batal</button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
          >💾 Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default CrudBlog;
