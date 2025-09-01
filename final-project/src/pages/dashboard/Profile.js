import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="p-8">Memuat data pengguna...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={
              user.image_url ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 mb-4"
          />
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-semibold text-gray-500">Nama</label>
            <p className="text-lg text-gray-800">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-500">Email</label>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            &larr; Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;