import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        // Sort categories alphabetically by name
        const sortedCategories = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <i className="bx bx-menu menu-icon" onClick={() => setIsOpen(!isOpen)}></i>
        <span className="logo-name">Categories</span>
      </div>

      {/* Scrollable Categories */}
      <div className="sidebar-content">
        <ul className="category-list">
          <li className="category-item">
            <button
              className="category-btn"
              onClick={() => onCategorySelect("all")} // Added to select "All"
            >
              <i className="bx bx-folder-open icon"></i>
              <span className="category-text">All</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <button
                className="category-btn"
                onClick={() => onCategorySelect(category.name)} // Send category name to parent component
              >
                <i className="bx bx-folder-open icon"></i>
                <span className="category-text">{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && <section className="overlay" onClick={() => setIsOpen(false)}></section>}
    </nav>
  );
};

export default Sidebar;
