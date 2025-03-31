import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './StoreList.css';
import SortDropdown from "./SortDropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon as OutlineHeartIcon, HeartIcon } from "@heroicons/react/24/solid";

const StoreList = ({ selectedCategory }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStores, setFilteredStores] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedStores, setBookmarkedStores] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const storesPerPage = 12;  // Number of stores per page

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    let filteredData = [...stores];

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredData = filteredData.filter((store) => store.cats === selectedCategory);
    }

    // Apply alphabet or number filters
    if (filter === "0-9") {
      filteredData = filteredData.filter((store) => /^\d/.test(store.name));
    } else if (filter === "alphabet") {
      filteredData = filteredData.filter((store) => /^[a-zA-Z]/.test(store.name));
    } else if (filter !== "all") {
      filteredData = filteredData.filter((store) => store.name.toLowerCase().startsWith(filter.toLowerCase()));
    }

    // Apply search term
    if (searchTerm) {
      filteredData = filteredData.filter((store) => store.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Apply sorting
    if (sortOption) {
      filteredData.sort((a, b) => {
        switch (sortOption) {
          case "alphabet":
            return a.name.localeCompare(b.name);
          case "cashback":
            return b.cashback_percent - a.cashback_percent;
          case "featured":
            return b.featured - a.featured;
          case "popularity":
            return b.popularity - a.popularity;
          default:
            return 0;
        }
      });
    }

    setFilteredStores(filteredData);
  }, [filter, stores, selectedCategory, sortOption, searchTerm]);

  const handleBookmarkToggle = (storeId) => {
    let updatedBookmarkedStores = [...bookmarkedStores];

    if (updatedBookmarkedStores.includes(storeId)) {
      updatedBookmarkedStores = updatedBookmarkedStores.filter((id) => id !== storeId);
    } else {
      updatedBookmarkedStores.push(storeId);
    }

    setBookmarkedStores(updatedBookmarkedStores);
    localStorage.setItem("bookmarkedStores", JSON.stringify(updatedBookmarkedStores)); // Save to localStorage
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedStores"));
    if (Array.isArray(storedBookmarks)) {
      setBookmarkedStores(storedBookmarks); // Ensure it's an array
    }
  }, []);

  const alphabetFilter = ["All", "0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  // Syncing URL parameters with state
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (filter !== "all") params.set("filter", filter);
    if (searchTerm) params.set("search", searchTerm);
    if (sortOption) params.set("sort", sortOption);

    navigate(`?${params.toString()}`); // Update the URL with parameters
  };

  // Read parameters from URL on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.has("filter")) setFilter(urlParams.get("filter"));
    if (urlParams.has("search")) setSearchTerm(urlParams.get("search"));
    if (urlParams.has("sort")) setSortOption(urlParams.get("sort"));
  }, [location.search]);

  useEffect(() => {
    updateUrlParams();
  }, [filter, searchTerm, sortOption]);

  // Pagination Logic
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = filteredStores.slice(indexOfFirstStore, indexOfLastStore);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="store-list-container">
      <h2>Stores</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-wrapper">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Alphabet Pagination Filter */}
        <div className="pagination-filter">
          {alphabetFilter.map((letter) => (
            <span
              key={letter}
              className={filter === letter ? "active" : ""}
              onClick={() => setFilter(letter === "All" ? "all" : letter)}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="sort-dropdown-container">
          <SortDropdown selectedSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Store List */}
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <div className="store-grid">
          {currentStores.length === 0 ? (
            <p>No stores found for this category</p>
          ) : (
            currentStores.map((store) => (
              <div key={store.id} className="store-card" onClick={() => window.location.href = store.homepage}>
                <div className="heart-icon-container">
                  {bookmarkedStores.includes(store.id) ? (
                    <HeartIcon
                      className="heart-icon filled"
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent redirect when clicking the heart icon
                        handleBookmarkToggle(store.id);
                      }}
                    />
                  ) : (
                    <OutlineHeartIcon
                      className="heart-icon"
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent redirect when clicking the heart icon
                        handleBookmarkToggle(store.id);
                      }}
                    />
                  )}
                </div>
                <div className="store-logo-name">
                  <img src={store.logo || "default-image.jpg"} alt={store.name} className="store-image" />
                  <h3>{store.name}</h3>
                </div>

                {/* Cashback Information */}
                <p className="cashback-info">
                  <strong>Cashback:</strong> {store.cashback_enabled === 0 ? "No cashback available" : `${store.cashback_type === 'percent' ? "Upto" : "Flat"} ${store.cashback_amount.toFixed(2)}${store.cashback_type === 'percent' ? "%" : "$"}`}
                </p>
                
                <a href={store.homepage} target="_blank" rel="noopener noreferrer">
                  <button className="shop-now-btn">Shop Now</button>
                </a>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {Array.from({ length: Math.ceil(filteredStores.length / storesPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
