import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";

const PermissionsList = () => {
  const { permissions } = usePage().props;
  const [newPermission, setNewPermission] = useState("");

  const handleAddPermission = (e) => {
    e.preventDefault();
    router.post("/admin/permissions", { name: newPermission }, {
      onSuccess: () => setNewPermission(""),
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this permission?")) {
      router.delete(`/admin/permissions/${id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Permissions List</h2>

      {/* إضافة صلاحية جديدة */}
      <form onSubmit={handleAddPermission} className="flex gap-2 mb-4">
        <input
          type="text"
          name="name"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="New Permission Name"
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Permission
        </button>
        
      </form>

      {/* عرض قائمة الصلاحيات */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Permission Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm) => (
            <tr key={perm.id}>
              <td className="border border-gray-300 px-4 py-2">{perm.name}</td>
              <td className="border border-gray-300 px-4 py-2"><button
    onClick={() => handleDelete(perm.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  >
    Delete
  </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsList;
