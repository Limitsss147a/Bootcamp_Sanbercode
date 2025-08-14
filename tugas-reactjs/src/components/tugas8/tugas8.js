import React from "react";
import { useState } from "react";
import "./tugas8.css";

function Tugas8() {
  const [count, setCount] = useState(1);

  const handleTambah = () => {
    setCount(count + 1);
  };

  return (
    <div className="tugas8-container">
      <p>{count}</p>
      <button onClick={handleTambah} className="tugas8-btn">Tambah</button>
      { count > 9 ? <p className="tugas8-warning">State count sudah lebih dari 10!!</p> : null }
    </div>
  );
}

export default Tugas8;