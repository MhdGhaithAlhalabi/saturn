import { useState } from "react";
import { router } from "@inertiajs/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";



function AdjustQuantityModal({ productId, locationId, locationQuantity }) {
  const [quantity, setQuantity] = useState(locationQuantity || 0); // تبدأ بالقيمة الحالية
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // إدارة حالة المودال
  

  const handleSubmit = () => {
    router.post(
      "/product-locations/adjust",
      {
        product_id: productId,
        location_id: locationId,
        quantity,
        adjustment_reason: reason,
      },
      {
        preserveScroll: true,
      }
    );

    setIsModalOpen(false); // إغلاق المودال بعد الإرسال
  };

  const handleOpenModal = () => {
    setQuantity(locationQuantity || 0); // تعيين القيمة الحالية عند فتح المودال
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* زر فتح المودال */}
      {/* <button
        onClick={handleOpenModal}
        className="text-white bg-green-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Adjust Quantity
      </button> */}
      <button
              onClick={handleOpenModal}
                className="bg-green-500 hover:bg-green-600 text-white font-medium p-1 rounded shadow-md flex items-center justify-center mt-1"
                title="Edit"
              >
                <FaEdit className="w-4 h-4" />
              </button>


      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Adjust Quantity</h3>

            {/* إدخال الكمية */}
            <input
              type="number"
              value={quantity}
              min={0}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />

            {/* إدخال السبب */}
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Adjustment reason"
              className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            />

            {/* أزرار الإجراء */}
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)} // إغلاق المودال
                className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} // إرسال البيانات
                className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdjustQuantityModal;
