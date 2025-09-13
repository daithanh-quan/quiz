"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

import logo from "src/assets/images/quiz_logo.png";
import useAuth from "src/hooks/useAuth";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Documents", href: "/admin/documents", icon: FileText },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  const { logout } = useAuth();
  const sidebarOpen = true;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:inset-0 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center px-4">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.name
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } `}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div
            onClick={logout}
            className="flex cursor-pointer items-center space-x-3 hover:bg-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full">
              <LogOut className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-gray-500">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
