import React from "react";
import "../card.css";

function Tugas7(props) {
  return (
    <div className="card">
        <h2>Data diri peserta kelas Reactjs</h2>
        <hr/>
        <ul>
            <li><b>Nama Lengkap</b> : {props.name}</li>
            <li><b>Email</b> : {props.email}</li>
            <li><b>Batch Pelatihan</b> : {props.batch}</li>
        </ul>
    </div>
  );
}

export default Tugas7;