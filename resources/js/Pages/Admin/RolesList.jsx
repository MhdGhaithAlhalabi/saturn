import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";

const RolesList = () => {
  const { roles, permissions } = usePage().props; // الأدوار والصلاحيات المرسلة من Laravel
  const [editingRole, setEditingRole] = useState(null); // الدور الجاري تعديله
  const [form, setForm] = useState({}); // نموذج التعديل
  const [newRole, setNewRole] = useState("");


  const handleEditClick = (role) => {
    setEditingRole(role.id); // تعيين الدور الجاري تعديله
    setForm({
      name: role.name,
      permissions: role.permissions.map((perm) => perm.name),
    });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    router.post("/admin/roles", { name: newRole }, {
      onSuccess: () => setNewRole(""),
    });
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
    setForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const selectedPermissions = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form, permissions: selectedPermissions });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this role?")) {
      router.delete(`/admin/roles/${id}`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    router.put(`/admin/roles/${editingRole}`, form, {
      onSuccess: () => {
        setEditingRole(null);
        setForm({});
      },
    });
  };

  return (
    <>

    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
           {/* إضافة صلاحية جديدة */}
           <form onSubmit={handleAddRole} className="flex gap-2 mb-4">
          <input
            type="text"
            name="name"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="New Role Name"
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Role
          </button>

        </form>
      <h2 className="text-lg font-semibold mb-4">Roles List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Role Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Permissions</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              {editingRole === role.id ? (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      multiple
                      name="permissions"
                      value={form.permissions}
                      onChange={handlePermissionChange}
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {permissions.map((perm) => (
                        <option key={perm.id} value={perm.name}>
                          {perm.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {role.permissions.map((perm) => perm.name).join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditClick(role)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
    onClick={() => handleDelete(role.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  >
    Delete
  </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default RolesList;
