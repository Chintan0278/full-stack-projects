import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid"; // Import the filled heart icon

const BookmarkedStoresPage = ({ bookmarkedStores }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:5000/stores");
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const bookmarkedStoreDetails = stores.filter((store) =>
    bookmarkedStores.includes(store.id)
  );

  return (
    <div className="bookmarked-stores-container">
      <h2>Bookmarked Stores</h2>

      {loading ? (
        <p>Loading bookmarked stores...</p>
      ) : bookmarkedStoreDetails.length === 0 ? (
        <p>No stores bookmarked yet.</p>
      ) : (
        <div className="store-grid">
          {bookmarkedStoreDetails.map((store) => (
            <div key={store.id} className="store-card">
              <div className="heart-icon-container">
                <HeartIcon className="heart-icon filled" />
              </div>
              <img
                src={store.logo || "default-image.jpg"}
                alt={store.name}
                className="store-image"
              />
              <h3>{store.name}</h3>
              <p>
                <strong>Cashback:</strong> {store.cashback_percent}% {store.cashback_type}
              </p>
              <a href={store.homepage} target="_blank" rel="noopener noreferrer">
                <button className="shop-now-btn">Shop Now</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedStoresPage;
