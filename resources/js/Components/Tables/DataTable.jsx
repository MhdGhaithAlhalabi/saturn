import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import AdjustQuantityModal from "../AdjustQuantity";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const DataTablePage = () => {
  const { products } = usePage().props; // Fetch products from props
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredData, setFilteredData] = useState(products || []); // Filtered data state

  // Update filtered data whenever search term or products change
  useEffect(() => {
    const filtered = products.filter((item) => {
      const matchesName = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCode = item.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = item.locations.some((loc) =>
        loc.full_location?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return matchesName || matchesCode || matchesLocation;
    });

    setFilteredData(filtered);
  }, [searchTerm, products]);

  // Handle delete action
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      router.delete(`/products/${id}`);
    }
  };

  // Define columns for the table
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.total_quantity,
      sortable: true,
    },
    {
      name: "Locations",
      cell: (row) => (
        <div>
          {row.locations.map((loc) => (
            <div key={loc.id} style={{ marginBottom: "10px" }}>
              <span>
                {loc.full_location} - Quantity: {loc.pivot.quantity}
              </span>
              <AdjustQuantityModal
                productId={row.id}
                locationId={loc.id}
                locationQuantity={loc.pivot.quantity}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            title="View"
          >
            <FaEye />
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* DataTable Component */}
      <DataTable
        title="Items"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search by code, name, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
        }
        noDataComponent={<div>No items found</div>} // Handle empty state
      />
    </div>
  );
};

export default DataTablePage;
