import React from "react";

const StoreItem = ({ store }) => {
  return (
    <div className="p-4">
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={store.logo}
        alt={store.name}
      />
      <h3 className="text-xl font-semibold mt-4">{store.name}</h3>
      <p className="text-gray-600 mt-2">{store.description}</p>
      <a
        href={store.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-4 block"
      >
        Visit Store
      </a>
    </div>
  );
};

export default StoreItem;
