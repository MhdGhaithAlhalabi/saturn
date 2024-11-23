import React, { useState } from 'react';
import axios from 'axios';

const Header = ({ onSearchResults, sidebarOpen, setSidebarOpen }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/search", {
        params: { query },
      });

      if (response.data.message) {
        onSearchResults([]); // إذا لم يتم العثور على نتائج
      } else {
        onSearchResults(response.data); // تمرير النتائج إلى DefaultLayout
      }
    } catch (error) {
      console.error("Error searching:", error);
      onSearchResults([]); // إعادة تعيين النتائج عند الخطأ
    }
  };

  return (
    <header>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
