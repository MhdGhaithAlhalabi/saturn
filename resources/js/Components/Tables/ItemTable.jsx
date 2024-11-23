import { usePage } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AdjustQuantityModal from "../AdjustQuantity";


export default function ItemTable(){
    const { products } = usePage().props;
    

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
        Items
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5">
        <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Code
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantate
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Locations
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>
        {products.map((product) => (
          <div
            className={"grid grid-cols-3 sm:grid-cols-5 border-b border-stroke"}
            key={product.id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{product.code}</p>
            </div>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black">
                {product.name}
              </p>
            </div>

            

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{product.total_quantity}</p>
            </div>

            <div className="flex items-center justify-center p-2.5  xl:p-5">
              <p className="text-black">
              {product.locations.map((loc) => (
                                    <div key={loc.id}>
                                        <div>
                                            {loc.full_location} - Quantity: {loc.pivot.quantity}  
              <AdjustQuantityModal
                                            productId={product.id}
                                            locationId={loc.id}
                                            locationQuantity={loc.pivot.quantity}
                                        />
                                        </div>
                                        
                                    </div>
                                ))}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
               <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium p-1 rounded shadow-md flex items-center justify-center"
                title="Show"
              >
                <FaEye className="w-4 h-4" />
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium p-1 rounded shadow-md flex items-center justify-center"
                title="Edit"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium p-1 rounded shadow-md flex items-center justify-center"
                title="Delete"
              >
                <FaTrash className="w-4 h-4" />
              </button>
              
              </p>
            </div>
          </div>
        ))}
      </div>


</div>

      );
      };