import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreItem from "./StoreItem"; // Assuming each store is rendered by this component
import { motion } from "framer-motion"; // Animation library for smoother transitions

const AllStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stores from API or DB
    axios
      .get("http://localhost:3001/stores") // Replace with your stores API endpoint
      .then((response) => {
        setStores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Stores</h2>

      {/* If stores are still loading, show loading animation */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Render stores */}
          {stores.map((store) => (
            <motion.div
              key={store.id}
              className="store-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StoreItem store={store} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStoresPage;
