<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return Inertia::render('Admin/PermissionsList', ['permissions' => $permissions]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission added successfully.');
    }

    public function destroy(Permission $permission)
{
    $permission->delete();
    return redirect()->route('admin.permissions.index')->with('success', 'Permission deleted successfully.');
}

}
