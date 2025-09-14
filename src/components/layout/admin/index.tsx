import React from "react";

import { navigationItems } from "src/components/layout/admin/navigateItems";
import Header from "src/components/layout/common/header";

import Sidebar from "../common/sidebar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 z-20 hidden cursor-pointer bg-gray-900 bg-opacity-50 peer-checked:block lg:hidden"
      />

      {/* Sidebar */}
      <Sidebar navigationItems={navigationItems} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-0">
        {/* Header */}
        <Header />
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
