import { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const sortingOptions = [
  { name: "Select Sorting", value: "" }, // Default option
  { name: "Popularity", value: "popularity" },
  { name: "Cashback", value: "cashback" },
  { name: "Alphabetical (A-Z)", value: "alphabet" },
];

const SortDropdown = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState(sortingOptions[0]);

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    onSortChange(sortOption.value); // Pass the sorting value to parent component
  };

  return (
    <div className="relative inline-block text-left ml-auto"> {/* Align to right side */}
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-200">
              {selectedSort.name}
              <ChevronDownIcon className={`w-5 h-5 text-gray-500 transform ${open ? "rotate-180" : "rotate-0"} transition-transform`} />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {sortingOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSortChange(option)}
                      className={`block w-full px-4 py-2 text-left text-gray-700 transition-all duration-150 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      {option.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default SortDropdown;
