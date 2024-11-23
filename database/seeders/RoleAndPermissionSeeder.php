<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        // إنشاء الصلاحيات
        Permission::firstOrCreate(['name' => 'view item']);
        Permission::firstOrCreate(['name' => 'create item']);
        Permission::firstOrCreate(['name' => 'edit item']);
        Permission::firstOrCreate(['name' => 'delete item']);

        // إنشاء الأدوار وربطها بالصلاحيات
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $editorRole->givePermissionTo(['view item', 'edit item']);

        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);
        $viewerRole->givePermissionTo(['view item']);
    }
}
