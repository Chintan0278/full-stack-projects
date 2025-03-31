import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ModifyStore.css';

const ModifyStore = () => {
  const [storeData, setStoreData] = useState({
    name: "",
    category: "",
    cashback: "",
    logo: "",
    homepage: "",
    slug: "",
    cashback_enabled: 0,
    cashback_percent: 0,
    cashback_amount: 0.00,
    cashback_type: "cashback",
    amount_type: "fixed",
    rate_type: "upto",
    is_claimable: 0,
    is_shareable: 1,
    is_featured: 0,
    is_promoted: 1,
    visits: 0,
    offers_count: 0,
    rating: 0,
    rating_count: 0,
    clicks: 0,
    status: "publish",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { storeId } = useParams(); // Get store ID if editing

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fetch store data if editing
  useEffect(() => {
    if (storeId) {
      setIsEditMode(true);
      axios
        .get(`http://localhost:5000/stores/${storeId}`)
        .then((response) => {
          setStoreData(response.data);
        })
        .catch((error) => console.error("Error fetching store data:", error));
    }
  }, [storeId]);

  // Add or update store
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure cashback is formatted correctly
    const formattedCashback = storeData.cashback
      ? parseFloat(storeData.cashback).toFixed(2)
      : "0.00"; // Default to "0.00" if no cashback provided

    const updatedStoreData = { ...storeData, cashback: formattedCashback };

    try {
      if (isEditMode) {
        // Update store
        await axios.put(`http://localhost:5000/stores/${storeId}`, updatedStoreData);
        alert("Store updated successfully!");
      } else {
        // Add new store
        await axios.post("http://localhost:5000/stores", updatedStoreData);
        alert("Store added successfully!");
      }

      navigate("/all-stores"); // Redirect to the All Stores page
    } catch (error) {
      console.error("Error submitting store data:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  // Delete store
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/stores/${storeId}`);
      alert("Store deleted successfully!");
      navigate("/all-stores"); // Redirect to the All Stores page
    } catch (error) {
      console.error("Error deleting store:", error);
      alert("An error occurred while deleting the store.");
    }
  };

  return (
    <div className="container">
      <h2>{isEditMode ? "Edit Store" : "Add New Store"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Store Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={storeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={storeData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cashback">Cashback:</label>
          <input
            type="text"
            id="cashback"
            name="cashback"
            value={storeData.cashback}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Store Logo URL:</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={storeData.logo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="homepage">Store Homepage:</label>
          <input
            type="text"
            id="homepage"
            name="homepage"
            value={storeData.homepage}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields as needed */}
        <button type="submit">{isEditMode ? "Update Store" : "Add Store"}</button>
      </form>

      {isEditMode && (
        <>
          <button onClick={handleDelete} className="delete-button">
            Delete Store
          </button>
        </>
      )}
    </div>
  );
};

export default ModifyStore;
