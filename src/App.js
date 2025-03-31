import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Correct import paths to your components and CSS
import AllStoresPage from "./Components/AllStoresPage";
import Sidebar from "./Components/Sidebar";
import StoreList from "./Components/StoreList";
import BookmarkedStoresPage from "./Components/BookmarkedStoresPage";
import ModifyStore from "./Components/ModifyStore"; // Import the ModifyStore component

// Navigation links
const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "All Stores", href: "/all-stores", current: false },
  { name: "Bookmarked", href: "/bookmarked", current: false },
  { name: "Modify Store", href: "/modify-store", current: false }, // Add Modify Store link
  { name: "About", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarkedStores, setBookmarkedStores] = useState(
    JSON.parse(localStorage.getItem("bookmarkedStores")) || [] // Get saved bookmarks
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "All" ? "all" : category);
  };

  const handleBookmark = (store) => {
    setBookmarkedStores((prev) => {
      const isAlreadyBookmarked = prev.some((item) => item.id === store.id);
      if (isAlreadyBookmarked) {
        return prev.filter((item) => item.id !== store.id);
      } else {
        return [...prev, store];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedStores", JSON.stringify(bookmarkedStores)); // Save bookmarks
  }, [bookmarkedStores]);

  return (
    <Router>
      <div className="min-h-full">
        {/* Navbar */}
        <Disclosure as="nav" className="border-b border-gray-200 bg-white py-4">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-900">Enacton</span>
                </div>

                <div className="hidden sm:flex space-x-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <div className="pt-20 px-4 lg:px-8">
          <main className="mx-auto max-w-7xl flex gap-6">
            {/* Sidebar */}
            <div className="w-1/4 min-w-[250px]">
              <Sidebar className="bg-white shadow-xl" onCategorySelect={handleCategorySelect} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Home with StoreList */}
                <Route
                  path="/home"
                  element={<StoreList selectedCategory={selectedCategory} onBookmark={handleBookmark} />}
                />

                {/* All stores page */}
                <Route path="/all-stores" element={<AllStoresPage />} />

                {/* Bookmarked stores */}
                <Route
                  path="/bookmarked"
                  element={<BookmarkedStoresPage bookmarkedStores={bookmarkedStores} />}
                />

                {/* Modify Store page (Add or Edit) */}
                <Route path="/modify-store/:storeId?" element={<ModifyStore />} /> {/* Dynamic route for editing */}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
