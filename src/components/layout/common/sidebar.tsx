"use client";

import React, { useCallback } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogOut } from "lucide-react";

import logo from "src/assets/images/quiz_logo.png";
import useAuth from "src/hooks/useAuth";

import { NavigateItem } from "./interface";

type Props = {
  navigationItems: NavigateItem[];
};

const Sidebar: React.FC<Props> = ({ navigationItems }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = useCallback(
    (item: NavigateItem) => {
      if (item.activeRoutes) {
        const routes = Array.isArray(item.activeRoutes)
          ? item.activeRoutes
          : [item.activeRoutes];

        return routes.some((route) => pathname.includes(route));
      }

      return pathname === item.href;
    },
    [pathname],
  );

  return (
    <aside
      className={
        "fixed inset-y-0 left-0 z-30 w-64 -translate-x-full transform bg-white shadow-lg transition-transform duration-200 ease-in-out peer-checked:translate-x-0 lg:static lg:inset-0 lg:translate-x-0"
      }
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center px-4">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navigationItems?.map((item) => {
            const Icon = item?.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active
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
