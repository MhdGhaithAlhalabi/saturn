import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import LocationPicker from "../../Components/LocationPicker";

function ProductsPage() {
  const { errors = {} } = usePage().props; // الحصول على الأخطاء من Inertia
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة المودال
  const [newProducts, setNewProducts] = useState([]); // قائمة المنتجات المؤقتة
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [locations, setLocations] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // تتبع المنتج قيد التعديل

  // دالة للحصول على الأخطاء بناءً على المفتاح
  const getError = (fieldPath) => {
    return errors[fieldPath] || null; // إذا وجد خطأ مرتبط بالمفتاح، يتم إرجاعه
  };

  const handleAddProduct = () => {
    // if (!code || locations.length === 0) {
    //   alert("Code and at least one location are required.");
    //   return;
    // }

    if (editIndex !== null) {
      // تحديث المنتج بدلاً من إضافته
      setNewProducts((prev) =>
        prev.map((product, index) =>
          index === editIndex ? { code, name, locations } : product
        )
      );
      setEditIndex(null); // مسح حالة التعديل
    } else {
      // إضافة منتج جديد
      setNewProducts((prev) => [
        ...prev,
        {
          code,
          name,
          locations,
        },
      ]);
    }

    // إعادة تعيين الحقول
    setCode("");
    setName("");
    setLocations([]);
  };

  const handleEditProduct = (index) => {
    const product = newProducts[index];
    setCode(product.code);
    setName(product.name);
    setLocations([...product.locations]); // تحديث المواقع
    setEditIndex(index); // حفظ رقم المنتج قيد التعديل
  };

  const handleDeleteProduct = (index) => {
    setNewProducts((prev) => prev.filter((_, i) => i !== index)); // حذف المنتج
  };

  const handleSubmitAll = () => {
    router.post(
      "/items/create",
      { products: newProducts },
      {
        onSuccess: () => {
          setNewProducts([]); // إعادة تعيين قائمة المنتجات المؤقتة
          setIsModalOpen(false); // إغلاق المودال
        },
      }
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* زر فتح المودال */}
      <button
        onClick={handleOpenModal}
        className="mt-6 text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Add New Item
      </button>

      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Create Product</h3>

            {/* كود المنتج */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Code (Required):
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter product code"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              />
              {/* عرض الخطأ المرتبط بكود المنتج */}
              {getError(`products.${editIndex !== null ? editIndex : newProducts.length}.code`) && (
                <div className="text-red-600 text-sm mt-1">
                  {getError(`products.${editIndex !== null ? editIndex : newProducts.length}.code`)}
                </div>
              )}
            </div>

            {/* اسم المنتج */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name (Optional):
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              />
            </div>

            {/* اختيار المواقع */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Locations:</h4>
              <LocationPicker locations={locations} setLocations={setLocations} />
            </div>

            {/* زر إضافة المنتج */}
            <button
              onClick={handleAddProduct}
              className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
            >
              {editIndex !== null ? "Update Product" : "Add Product to List"}
            </button>

            {/* عرض قائمة المنتجات المؤقتة */}
            {newProducts.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  New Products List:
                </h4>
                <ul className="space-y-2">
                  {newProducts.map((product, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                    >
                      <div>
                        <strong>{product.code}</strong> - {product.name} (
                        {product.locations.length} locations)
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* أزرار الإجراءات */}
            <div className="mt-5 flex justify-end space-x-3">
  <button
    onClick={() => setIsModalOpen(false)} // إغلاق المودال
    className="text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2"
  >
    Cancel
  </button>
  {/* زر الإرسال يظهر فقط إذا كانت المنتجات غير فارغة */}
  {newProducts.length > 0 && (
    <button
      onClick={handleSubmitAll} // إرسال جميع المنتجات
      className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
    >
      Submit All
    </button>
  )}
</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
