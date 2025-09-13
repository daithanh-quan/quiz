import React from "react";

import { Bell, Menu, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center">
          <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

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

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
