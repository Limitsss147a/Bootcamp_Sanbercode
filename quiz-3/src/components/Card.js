import React from 'react';

const Card = ({ game }) => {
  // Fungsi untuk konversi size
  const formatSize = (sizeInMB) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  // Fungsi untuk format harga
  const formatPrice = (price) => {
    if (price === 0) {
      return "FREE";
    }
    return `Rp. ${price.toLocaleString('id-ID')},-`;
  };

  return (
    <div className="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/3">
        <img className="w-full h-full object-cover" src={game.image_url} alt={game.name} />
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-gray-900 font-bold text-2xl">{game.name}</h1>
          <p className="mt-2 text-gray-600 text-sm">{game.release_year}</p>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{game.description}</p>
          <div className="mt-2 text-xs text-gray-500">
            {game.category} | {formatSize(game.size)} | {game.is_android_app ? "Android" : ""}  {game.is_ios_app ? "IOS" : ""}
          </div>
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">{formatPrice(game.price)}</h1>
          <div className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
            {game.rating} RATINGS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;