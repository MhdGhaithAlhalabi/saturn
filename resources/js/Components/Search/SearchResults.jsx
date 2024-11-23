import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="p-4 bg-white border rounded shadow-lg">
      <h4 className="text-lg font-bold mb-4">Search Results:</h4>

      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id} className="mb-4">
              <strong>{result.name}</strong> (Code: {result.code})
              <ul className="mt-2">
                {result.locations.map((location) => (
                  <li key={location.id}>
                    Location: {location.full_location} - Quantity: {location.pivot.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
