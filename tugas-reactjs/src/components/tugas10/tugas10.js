import React, { useEffect, useState } from "react";
import axios from "axios";

const Tugas10 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://tugas-react-sanber.vercel.app/api/student-scores")
      .then((res) => {
        console.log("Data dari API:", res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  const handleIndexScore = (score) => {
    if (score >= 80) {
      return "A";
    } else if (score >= 70) {
      return "B";
    } else if (score >= 60) {
      return "C";
    } else if (score >= 50) {
      return "D";
    } else {
      return "E";
    }
  };

  return (
    <div className="w-[790px] mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="text-xs text-white uppercase bg-purple-500">
        <tr>
            <th scope="col" className="px-6 py-3">NO</th>
            <th scope="col" className="px-6 py-3">NAMA</th>
            <th scope="col" className="px-6 py-3">MATA KULIAH</th>
            <th scope="col" className="px-6 py-3">NILAI</th>
            <th scope="col" className="px-6 py-3">INDEX NILAI</th>
        </tr>
        </thead>
        <tbody>
        {data !== null ? (
            data.map((res, index) => (
            <tr key={res._id} className="bg-white border-b hover:bg-gray-50">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4">{res.name}</td>
                <td className="px-6 py-4">{res.course}</td>
                <td className="px-6 py-4">{res.score}</td>
                <td className="px-6 py-4">{handleIndexScore(res.score)}</td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan="5" className="text-center p-4">Loading...</td>
            </tr>
        )}
        </tbody>
    </table>
    </div>
  );
};

export default Tugas10;