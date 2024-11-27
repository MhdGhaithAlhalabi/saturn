import { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

const OrderPage = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pallets, setPallets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      axios
        .get(`/search?query=${term}`)
        .then((response) => {
          setSuggestions(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching product suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleAddProduct = (product) => {
    if (!product || quantity < 1) {
      alert("Please select a valid product and enter a quantity.");
      return;
    }

    setOrderProducts((prev) => [
      ...prev,
      { code: product.code, name: product.name, quantity },
    ]);

    setSearchTerm("");
    setQuantity(1);
    setSuggestions([]);
  };

  const handleBulkAdd = (bulkInput) => {
    const lines = bulkInput.split("\n");
    const newProducts = lines.map((line) => {
      const [code, qty] = line.split(":");
      return { code: code.trim(), quantity: parseInt(qty.trim(), 10) };
    });

    setOrderProducts((prev) => [...prev, ...newProducts]);
  };

  const removeProduct = (index) => {
    setOrderProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const calculatePallets = () => {
    if (orderProducts.length === 0) {
      alert("Please add products before calculating pallets.");
      return;
    }

    setLoading(true);

    axios
      .post("/orders/calculate-pallets", { products: orderProducts })
      .then((response) => {
        setPallets(response.data || []);
      })
      .catch((error) => {
        console.error("Error calculating pallets:", error);
        alert("Failed to calculate pallets. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveOrder = () => {
    if (orderProducts.length === 0) {
      alert("Please add products to the order before saving.");
      return;
    }

    router.post("/orders/store", { products: orderProducts });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Products</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Product Code"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
            {suggestions.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded w-full z-10">
                {suggestions.map((product) => (
                  <div
                    key={product.code}
                    onClick={() => handleAddProduct(product)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.code} - {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bulk Add</h2>
        <textarea
          placeholder="Enter products in format: CODE:QUANTITY (one per line)"
          onBlur={(e) => handleBulkAdd(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Products</h2>
        <ul className="list-disc pl-4">
          {orderProducts.map((product, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {product.name} (x{product.quantity}) - {product.code}
              </span>
              <button
                onClick={() => removeProduct(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={calculatePallets}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate Pallets"}
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Pallets</h2>
        {pallets.length > 0 ? (
          pallets.map((pallet, index) => (
            <div key={index} className="p-4 border rounded mb-4">
              <h3 className="font-bold">Pallet {index + 1}</h3>
              <ul className="list-disc pl-4">
                {pallet.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No pallets calculated yet.</p>
        )}
      </div>

      <button
        onClick={saveOrder}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Save Order
      </button>
    </div>
  );
};

export default OrderPage;
