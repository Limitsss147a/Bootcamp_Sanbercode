import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageData = () => {
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [input, setInput] = useState({
    name: '',
    description: '',
    category: '',
    release_year: 2010,
    size: 0,
    price: 0,
    rating: 0,
    image_url: '',
    is_android_app: 0,
    is_ios_app: 0,
  });

  const API_URL = "https://quiz-react-sanber.vercel.app/api/mobile-apps";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_URL)
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
        setInput({ ...input, [name]: checked ? 1 : 0 });
    } else {
        setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submissionData = { ...input };
    delete submissionData._id;

    if (currentId === null) {
      axios.post(API_URL, submissionData)
        .then(() => {
          fetchData();
        })
        .catch(error => console.error("Error creating data:", error));
    } else {
      axios.put(`${API_URL}/${currentId}`, submissionData)
        .then(() => {
          fetchData();
        })
        .catch(error => console.error("Error updating data:", error));
    }

    setCurrentId(null);
    setInput({
      name: '', description: '', category: '', release_year: 2010,
      size: 0, price: 0, rating: 0, image_url: '',
      is_android_app: 0, is_ios_app: 0,
    });
  };

  const handleEdit = (event) => {
    const id = event.target.value;
    const selectedData = data.find(item => item._id === id);
    if (selectedData) {
      setCurrentId(id);
      setInput(selectedData);
    }
  };

  const handleDelete = (event) => {
    const id = event.target.value;
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => console.error("Error deleting data:", error));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Data</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-12">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-purple-600">
            <tr>
              <th scope="col" className="py-3 px-6">NO</th>
              <th scope="col" className="py-3 px-6 w-1/4">NAMA</th>
              <th scope="col" className="py-3 px-6">KATEGORI</th>
              <th scope="col" className="py-3 px-6">DESCRIPTION</th>
              <th scope="col" className="py-3 px-6">PRICE</th>
              <th scope="col" className="py-3 px-6">RATING</th>
              <th scope="col" className="py-3 px-6">RELEASE YEAR</th>
              <th scope="col" className="py-3 px-6">SIZE</th>
              <th scope="col" className="py-3 px-6">ANDROID</th>
              <th scope="col" className="py-3 px-6">IOS</th>
              <th scope="col" className="py-3 px-6">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={item._id} className="bg-white border-b">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{item.category}</td>
                <td className="py-4 px-6 max-w-xs truncate">{item.description}</td>
                <td className="py-4 px-6">{item.price}</td>
                <td className="py-4 px-6">{item.rating}</td>
                <td className="py-4 px-6">{item.release_year}</td>
                <td className="py-4 px-6">{item.size}</td>
                <td className="py-4 px-6 text-center">
                  {item.is_android_app ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.is_ios_app ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                </td>
                <td className="py-4 px-6 flex gap-2">
                  <button onClick={handleEdit} value={item._id} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-4 rounded">
                    Edit
                  </button>
                  <button onClick={handleDelete} value={item._id} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-2xl font-bold mb-4">Create Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" name="image_url" value={input.image_url} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={input.name} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" value={input.category} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={input.description} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" value={input.price} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input type="number" name="rating" min="0" max="5" value={input.rating} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Release Year</label>
          <input type="number" name="release_year" min="2010" max="2025" value={input.release_year} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <input type="number" name="size" value={input.size} onChange={handleInput} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jenis Perangkat</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="is_android_app" checked={input.is_android_app === 1} onChange={handleInput} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2">Android</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="is_ios_app" checked={input.is_ios_app === 1} onChange={handleInput} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2">iOS</span>
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageData;