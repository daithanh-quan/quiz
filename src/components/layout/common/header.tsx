import React from "react";

import { Bell, Menu, Search } from "lucide-react";

import UserMenu from "src/components/layout/common/userMenu";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center">
          <label
            htmlFor="sidebar-toggle"
            className="cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>

          {/* Search Bar */}
          <div className="ml-4 hidden items-center md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
