import { useState, useEffect } from "react";
import axios from "axios";

const orderId = '1';
const PalletDistribution = () => {
  const [pallets, setPallets] = useState([]);

  useEffect(() => {
    axios.get(`/orders/${orderId}/pallets`).then((response) => {
      setPallets(response.data);
    });
  }, [orderId]);

  return (
    <div>
      <h1>Pallet Distribution</h1>
      {pallets.map((pallet, index) => (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Pallet {index + 1}</h2>
        <ul className="mt-2">
          {pallet.items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-gray-600">
                {item.length}x{item.width}x{item.height}
              </span>
            </li>
          ))}
        </ul>
      </div>


      ))}
    </div>
  );
};

export default PalletDistribution;
