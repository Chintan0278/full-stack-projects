import React from 'react';

const StoreCard = ({ store }) => {
  return (
    <div className="store-card border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{store.name}</h3>
      <p>{store.description}</p>
      {/* Add other details you want to show */}
    </div>
  );
};

export default StoreCard;
