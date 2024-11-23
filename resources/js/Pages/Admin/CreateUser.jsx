import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";

const CreateUser = () => {
  const { roles } = usePage().props; // الأدوار المرسلة من Laravel
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form, roles: selectedRoles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/admin/users", form, {
      onSuccess: () => setForm({ name: "", email: "", password: "", roles: [] }),
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Roles</label>
          <select
            multiple
            name="roles"
            value={form.roles}
            onChange={handleRoleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
