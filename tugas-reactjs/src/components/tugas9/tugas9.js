import React from "react";
import { Button } from "flowbite-react";

export default function Tugas9() {
  const dataMahasiswa = [
    { nama: "John", mataKuliah: "Algoritma", nilai: 80 },
    { nama: "Doe", mataKuliah: "Matematika", nilai: 70 },
    { nama: "Frank", mataKuliah: "Kalkulus", nilai: 60 },
    { nama: "Jason", mataKuliah: "Basis Data", nilai: 90 }
  ];

  const getIndexNilai = (nilai) => {
    if (nilai >= 80) return "A";
    if (nilai >= 70) return "B";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
  };

  return (
    <div className="w-[790px] mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="bg-purple-600 text-white uppercase text-xs">
        <tr>
            <th scope="col" className="px-4 py-2">No</th>
            <th scope="col" className="px-4 py-2">Nama</th>
            <th scope="col" className="px-4 py-2">Mata Kuliah</th>
            <th scope="col" className="px-4 py-2">Nilai</th>
            <th scope="col" className="px-4 py-2">Index Nilai</th>
            <th scope="col" className="px-4 py-2">Action</th>
        </tr>
        </thead>
        <tbody>
            {dataMahasiswa.map((mhs, index) => (
                <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{mhs.nama}</td>
                    <td className="px-4 py-2">{mhs.mataKuliah}</td>
                    <td className="px-4 py-2">{mhs.nilai}</td>
                    <td className="px-4 py-2">{getIndexNilai(mhs.nilai)}</td>
                    <td className="px-4 py-2 flex gap-2">
                        <Button size="xs" color="info">Edit</Button>
                        <Button size="xs" className="bg-red-500 text-white hover:bg-red-600">Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}