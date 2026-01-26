import React, { useState } from "react";
import Sidebar1 from "../components/sidebar1";
import Header1 from "../components/header1";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar1  />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header1 />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 mt-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
