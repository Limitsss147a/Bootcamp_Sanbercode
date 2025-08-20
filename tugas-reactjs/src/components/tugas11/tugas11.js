import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tugas11 = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState({
    name: "",
    course: "",
    score: 0
  });
  
  const [fetchStatus, setFetchStatus] = useState(true);
  const [current_Id, setCurrent_Id] = useState(-1);

  useEffect(() => {
    if (fetchStatus) {
      axios.get("https://tugas-react-sanber.vercel.app/api/student-scores")
        .then((res) => {
          console.log("fetched data:", res.data); 
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const getIndexScore = (score) => {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "E";
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { name, course, score } = input;

    axios.post('https://tugas-react-sanber.vercel.app/api/student-scores', { name, course, score: parseInt(score) })
      .then((res) => {
        console.log("Submit successful:", res.data);
        setFetchStatus(true);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error.response || error.message || error);
      });

    setInput({
      name: "",
      course: "",
      score: 0
    });
    setCurrent_Id(-1);
  };

  const handleDelete = (id) => {
    console.log("Deleting with studentId:", id);
    if (id === null || id === undefined) {
      console.error("No numeric studentId available for delete.");
      return;
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      console.error("studentId is not a number:", id);
      return;
    }

    axios.delete(`https://tugas-react-sanber.vercel.app/api/student-scores/${numericId}`)
      .then(() => {
        console.log("Delete success");
        setFetchStatus(true);
      })
      .catch((error) => {
        console.error("Delete error:", error.response ? error.response.data : error.message);
      });
  };
  
  return (
    <div className="w-[790px] container mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="text-xs text-white uppercase bg-purple-500">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">NO</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">NAMA</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">MATA KULIAH</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">NILAI</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">INDEX NILAI</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((res, index) => {
                const idToDelete = res.studentId ?? null;
                return (
                    <tr key={res._id} className="hover:bg-gray-100">
                      <td className="px-5 py-2">{index + 1}</td>
                      <td className="px-5 py-2">{res.name}</td>
                      <td className="px-5 py-2">{res.course}</td>
                      <td className="px-5 py-2">{res.score}</td>
                      <td className="px-5 py-2">{getIndexScore(res.score)}</td>
                      <td className="px-5 py-2">
                        <button 
                          onClick={() => handleDelete(idToDelete)} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          disabled={idToDelete === null}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Form Nilai Mahasiswa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nama:
            </label>
            <input onChange={handleInput} value={input.name} name='name' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nama Mahasiswa" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
              Mata Kuliah:
            </label>
            <input onChange={handleInput} value={input.course} name='course' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="course" type="text" placeholder="Mata Kuliah" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="score">
              Nilai:
            </label>
            <input onChange={handleInput} value={input.score} name='score' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="score" type="number" min="0" max="100" placeholder="0" required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tugas11;