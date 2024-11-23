import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import CreateUser from "./CreateUser";

const UsersList = () => {
  const { users, roles } = usePage().props; // المستخدمون والأدوار من Laravel
  const [editingUser, setEditingUser] = useState(null); // المستخدم الجاري تعديله
  const [form, setForm] = useState({}); // نموذج التعديل

  const handleEditClick = (user) => {
    setEditingUser(user.id); // تعيين المستخدم الجاري تعديله
    setForm({
      name: user.name,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null); // إلغاء التعديل
    setForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form, roles: selectedRoles });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(`/admin/users/${id}`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    router.put(`/admin/users/${editingUser}`, form, {
      onSuccess: () => {
        setEditingUser(null); // إلغاء التعديل بعد الحفظ
        setForm({});
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
            <CreateUser></CreateUser>

      <h2 className="text-lg font-semibold mb-4">Users List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Roles</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser === user.id ? (
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
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      multiple
                      name="roles"
                      value={form.roles}
                      onChange={handleRoleChange}
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
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
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.roles.map((role) => role.name).join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                  onClick={() => handleDelete(user.id)}
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
  );
};

export default UsersList;
