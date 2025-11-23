import React, { useState } from "react";
import Settingssidebar from "./settingsidebar";
import Header1 from "../header1";

function MainLayout({ children }) {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-60" : "w-20"
        }`}
      >
        <Settingssidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-1" : "ml-1"
        }`}
      >
        <Header1 />
        <div className="p-4 bg-white min-h-screen">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
