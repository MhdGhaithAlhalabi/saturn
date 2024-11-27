import React, { useEffect, useRef, useState } from "react";
//import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from "./SidebarLinkGroup";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    //   const location = useLocation();
    //    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);
    const { auth } = usePage().props;

    const canViewItem = auth.permissions.includes("view item");

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === "true"
    );
    const { url } = usePage();
    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // Close if the Esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    // Sync sidebar state with localStorage
    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document
                .querySelector("body")
                ?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/">
                    <img
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #ccc",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        }}
                        src={"./saturn_logo.png"}
                        alt="Logo"
                    />
                </Link>
                <Link href="/">
                    <h1>SATURN</h1>
                </Link>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* Sidebar Header End */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* Sidebar Menu */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* Menu Group */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* Dashboard */}
                            <SidebarLinkGroup>
                                {(handleClick, open) => (
                                    <>
                                        <Link
                                            href="/"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/" && "bg-graydark"
                                            }`}
                                        >
                                            <span>Dashboard</span>
                                        </Link>
                                        {canViewItem && (
                                            <Link
                                                href="/items"
                                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                    url === "/items" &&
                                                    "bg-graydark"
                                                }`}
                                            >
                                                <span>Items</span>
                                            </Link>
                                        )}

                                        <Link
                                            href="/orders"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/orders" &&
                                                "bg-graydark"
                                            }`}
                                        >
                                            <span>Order</span>
                                        </Link>
                                        <Link
                                            href="/logs"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/logs" && "bg-graydark"
                                            }`}
                                        >
                                            <span>logs</span>
                                        </Link>
                                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                            ADMIN
                                        </h3>
                                        <Link
                                            href="/admin/users"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/admin/users" &&
                                                "bg-graydark"
                                            }`}
                                        >
                                            <span>users</span>
                                        </Link>
                                        <Link
                                            href="/admin/roles"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/admin/roles" &&
                                                "bg-graydark"
                                            }`}
                                        >
                                            <span>roles</span>
                                        </Link>
                                        <Link
                                            href="/admin/permissions"
                                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                                                url === "/admin/permissions" &&
                                                "bg-graydark"
                                            }`}
                                        >
                                            <span>permissions</span>
                                        </Link>
                                    </>
                                )}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </nav>
                {/* Sidebar Menu End */}
            </div>
        </aside>
    );
};

export default Sidebar;
